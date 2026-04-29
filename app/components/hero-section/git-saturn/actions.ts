'use server'

import { mapGitHubDataToGitSaturn } from './github-data'
import type {
  FetchGitHubSaturnDataOptions,
  GetGitSaturnDataActionOptions,
  GitHubRepoApiItem,
  GitHubSaturnRawData,
  GitHubViewer,
} from './types'

const DEFAULT_API_BASE = 'https://api.github.com'

function parseLastPageFromLinkHeader(linkHeader: string | null): number | null {
  if (!linkHeader) return null

  const lastMatch = linkHeader.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/)
  if (!lastMatch) return null

  const page = Number.parseInt(lastMatch[1], 10)
  return Number.isFinite(page) ? page : null
}

function isValidUsername(username: string) {
  return /^[a-zA-Z0-9-]{1,39}$/.test(username)
}

function getToken() {
  return process.env.GITHUB_TOKEN || process.env.GITHUB_FINE_GRAINED_TOKEN || ''
}

function createHeaders(token: string): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

async function fetchJson<T>(
  url: string,
  headers: HeadersInit,
  requestTimeoutMs: number
): Promise<{ data: T; response: Response }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs)

  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GitHub API error ${response.status} at ${url}: ${errorText}`)
    }

    const data = (await response.json()) as T
    return { data, response }
  } finally {
    clearTimeout(timer)
  }
}

async function fetchUserRepos(
  username: string,
  headers: HeadersInit,
  requestTimeoutMs: number,
  apiBaseUrl: string,
  useAuthenticatedOwnerEndpoint: boolean
) {
  const firstUrl = useAuthenticatedOwnerEndpoint
    ? `${apiBaseUrl}/user/repos?sort=updated&per_page=100&page=1&visibility=all&affiliation=owner`
    : `${apiBaseUrl}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&page=1&type=owner`
  const firstPage = await fetchJson<GitHubRepoApiItem[]>(firstUrl, headers, requestTimeoutMs)

  const lastPage = parseLastPageFromLinkHeader(firstPage.response.headers.get('link')) ?? 1
  const repos = [...firstPage.data]

  if (lastPage > 1) {
    const pagePromises: Promise<GitHubRepoApiItem[]>[] = []
    for (let page = 2; page <= lastPage; page += 1) {
      const url = useAuthenticatedOwnerEndpoint
        ? `${apiBaseUrl}/user/repos?sort=updated&per_page=100&page=${page}&visibility=all&affiliation=owner`
        : `${apiBaseUrl}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&page=${page}&type=owner`
      const pagePromise = fetchJson<GitHubRepoApiItem[]>(url, headers, requestTimeoutMs).then((result) => result.data)
      pagePromises.push(pagePromise)
    }

    const restPages = await Promise.all(pagePromises)
    for (const pageItems of restPages) {
      repos.push(...pageItems)
    }
  }

  return repos
}

async function fetchCommitCountForRepo(
  owner: string,
  repoName: string,
  defaultBranch: string,
  headers: HeadersInit,
  requestTimeoutMs: number,
  apiBaseUrl: string
): Promise<number | null> {
  const url = `${apiBaseUrl}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}/commits?per_page=1&sha=${encodeURIComponent(defaultBranch)}`

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs)

  try {
    const response = await fetch(url, { headers, signal: controller.signal })

    if (!response.ok) {
      return null
    }

    const linkHeader = response.headers.get('link')
    const lastPage = parseLastPageFromLinkHeader(linkHeader)
    if (lastPage !== null) {
      return lastPage
    }

    const data = (await response.json()) as Array<{ sha: string }>
    return data.length
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function fetchGitHubSaturnData(
  token: string,
  options: FetchGitHubSaturnDataOptions = {}
): Promise<GitHubSaturnRawData> {
  const {
    username,
    maxRepos,
    includeCommitCounts = true,
    includePrivateRepos = true,
    requestTimeoutMs = 10_000,
    githubApiBaseUrl = DEFAULT_API_BASE,
  } = options

  if (!token.trim()) {
    throw new Error('token is required')
  }

  const headers = createHeaders(token)
  const viewer = await fetchJson<GitHubViewer>(`${githubApiBaseUrl}/user`, headers, requestTimeoutMs)
  const configuredUsername = username?.trim() || process.env.GITHUB_USERNAME?.trim() || viewer.data.login

  if (!configuredUsername) {
    throw new Error('Unable to resolve GitHub username from token')
  }

  if (!isValidUsername(configuredUsername)) {
    throw new Error('Invalid GitHub username')
  }

  const useAuthenticatedOwnerEndpoint =
    includePrivateRepos && viewer.data.login.toLowerCase() === configuredUsername.toLowerCase()

  const repoApiItems = await fetchUserRepos(
    configuredUsername,
    headers,
    requestTimeoutMs,
    githubApiBaseUrl,
    useAuthenticatedOwnerEndpoint
  )

  const selected =
    typeof maxRepos === 'number' && Number.isFinite(maxRepos)
      ? repoApiItems.slice(0, Math.max(1, maxRepos))
      : repoApiItems

  if (!includeCommitCounts) {
    return {
      username: configuredUsername,
      repos: selected.map((repo) => ({
        name: repo.name,
        stargazersCount: repo.stargazers_count,
        pushedAt: repo.pushed_at,
        defaultBranch: repo.default_branch,
        commitCount: null,
      })),
    }
  }

  const reposWithCounts = await Promise.all(
    selected.map(async (repo) => {
      const commitCount = await fetchCommitCountForRepo(
        repo.owner.login,
        repo.name,
        repo.default_branch,
        headers,
        requestTimeoutMs,
        githubApiBaseUrl
      )

      return {
        name: repo.name,
        stargazersCount: repo.stargazers_count,
        pushedAt: repo.pushed_at,
        defaultBranch: repo.default_branch,
        commitCount,
      }
    })
  )

  return {
    username: configuredUsername,
    repos: reposWithCounts,
  }
}

export async function getGitSaturnDataAction(
  options: GetGitSaturnDataActionOptions = {}
) {
  const token = getToken()
  if (!token) {
    throw new Error('Missing GITHUB_TOKEN in server environment')
  }

  const maxRepos =
    typeof options.maxRepos === 'number' && Number.isFinite(options.maxRepos)
      ? Math.max(1, options.maxRepos)
      : undefined
  const includeCommitCounts = options.includeCommitCounts ?? true

  const raw = await fetchGitHubSaturnData(token, {
    username: options.username,
    maxRepos,
    includeCommitCounts,
  })

  return mapGitHubDataToGitSaturn(raw, { maxRepos })
}
