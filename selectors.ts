import { State } from './types'
import { createSelector } from 'reselect'

const Selectors = {
  users: (state: State) => state.users,
  userData: (state: State) => state.users.list,
  posts: (state: State) => state.posts,
  postData: (state: State) => state.posts.list,
  postsById: (state: State, userId: number) =>
    state.posts.list.filter((post) => post.userId === userId),
}

export default Selectors

export const getPost = createSelector(Selectors.postsById, (t) => t)
