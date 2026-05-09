import type {
  GitHubSaturnRawData,
  GitSaturnRepo,
  MapGitHubToSaturnOptions,
} from '@/registry/default/git-saturn/lib/git-saturn.types'

function formatRelativeTime(input: string | null): string | undefined {
  if (!input) return undefined

  const then = new Date(input).getTime()
  const now = Date.now()
  const diffMs = Math.max(0, now - then)

  const minute = 60_000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diffMs < hour) {
    const mins = Math.max(1, Math.round(diffMs / minute))
    return `${mins} minute${mins === 1 ? '' : 's'} ago`
  }

  if (diffMs < day) {
    const hours = Math.max(1, Math.round(diffMs / hour))
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }

  if (diffMs < week) {
    const days = Math.max(1, Math.round(diffMs / day))
    return `${days} day${days === 1 ? '' : 's'} ago`
  }

  if (diffMs < month) {
    const weeks = Math.max(1, Math.round(diffMs / week))
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`
  }

  if (diffMs < year) {
    const months = Math.max(1, Math.round(diffMs / month))
    return `${months} month${months === 1 ? '' : 's'} ago`
  }

  const years = Math.max(1, Math.round(diffMs / year))
  return `${years} year${years === 1 ? '' : 's'} ago`
}

function fallbackCommitCount(stars: number, name: string, minimumCommits: number): number {
  const estimated = Math.round(stars * 1.3 + (name.length % 11) * 7)
  return Math.max(minimumCommits, estimated)
}

export function mapGitHubDataToGitSaturn(
  input: GitHubSaturnRawData,
  options: MapGitHubToSaturnOptions = {}
): { username: string; repos: GitSaturnRepo[] } {
  const { maxRepos, minimumCommits = 10 } = options

  const sourceRepos =
    typeof maxRepos === 'number' && Number.isFinite(maxRepos)
      ? input.repos.slice(0, Math.max(1, maxRepos))
      : input.repos

  const repos = sourceRepos
    .map((repo) => ({
      name: repo.name,
      commits:
        repo.commitCount === null
          ? fallbackCommitCount(repo.stargazersCount, repo.name, minimumCommits)
          : Math.max(minimumCommits, repo.commitCount),
      stars: repo.stargazersCount,
      lastActivity: formatRelativeTime(repo.pushedAt),
    }))
    .sort((a, b) => b.commits - a.commits)

  return {
    username: input.username,
    repos,
  }
}
