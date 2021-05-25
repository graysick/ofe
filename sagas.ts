import { all, fork, call, put, takeEvery } from 'redux-saga/effects'

import Actions from './actions'

function* fetchUsers({ payload }) {
  try {
    const resp = yield call(fetch, 'https://jsonplaceholder.typicode.com/users')
    const users = yield resp.json()
    yield put(Actions.users.fetchUsers.success(users))
    console.log(users.length)
  } catch (e) {
    yield put(Actions.users.fetchUsers.error(e))
    console.error(e)
  }
}

function* fetchPosts({ payload }) {
  try {
    const resp = yield call(fetch, 'https://jsonplaceholder.typicode.com/posts')
    const posts = yield resp.json()
    yield put(Actions.posts.fetchPosts.success(posts))
    console.log(posts.length)
  } catch (e) {
    yield put(Actions.posts.fetchPosts.error(e))
    console.error(e)
  }
}

function* userSagas() {
  yield takeEvery(Actions.users.fetchUsers.trigger, fetchUsers)
}

function* postSagas() {
  yield takeEvery(Actions.posts.fetchPosts.trigger, fetchPosts)
}

export default function* sagas() {
  yield all([fork(userSagas), fork(postSagas)])
}
