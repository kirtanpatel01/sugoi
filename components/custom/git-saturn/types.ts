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
}
