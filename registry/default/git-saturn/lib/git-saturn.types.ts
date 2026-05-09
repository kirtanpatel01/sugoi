export type GitSaturnRepo = {
  name: string
  commits: number
  stars?: number
  lastActivity?: string
}

export interface GitSaturnProps {
  repos: GitSaturnRepo[]
  username?: string
  width?: number
  height?: number
  interactive?: boolean
  className?: string
  showUsername?: boolean
  showStats?: boolean
  showRepoDetails?: boolean
}

export type GitHubSaturnRawRepo = {
  name: string
  stargazersCount: number
  pushedAt: string | null
  defaultBranch: string
  commitCount: number | null
}

export type GitHubSaturnRawData = {
  username: string
  repos: GitHubSaturnRawRepo[]
}

export type MapGitHubToSaturnOptions = {
  maxRepos?: number
  minimumCommits?: number
}

export type GetGitSaturnDataActionOptions = {
  username?: string
  maxRepos?: number
  includeCommitCounts?: boolean
}

export type FetchGitHubSaturnDataOptions = {
  username?: string
  maxRepos?: number
  includeCommitCounts?: boolean
  includePrivateRepos?: boolean
  requestTimeoutMs?: number
  githubApiBaseUrl?: string
}

export type GitHubRepoApiItem = {
  name: string
  stargazers_count: number
  pushed_at: string | null
  default_branch: string
  owner: {
    login: string
  }
}

export type GitHubViewer = {
  login: string
}
