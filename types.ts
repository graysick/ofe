export type Action = (payload?: any) => ActionObject & {
  toString: () => string
}

export type ActionObject = {
  type: string
  payload?: any
}

export type Routine = {
  trigger: Action
  success: Action
  error: Action
}

export type User = {
  id: number
  name: string
  username: string
  email: string
  website: string
}

export type UserState = {
  list: User[]
  error?: any
}

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type PostState = {
  list: Post[]
  error?: any
}

export type State = {
  users: UserState
  posts: PostState
}
