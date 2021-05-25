import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {
  TouchableOpacity,
  FlatList,
  View,
  Text,
  LayoutAnimation,
} from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import Actions from './actions'
import Selectors from './selectors'
import { State, User, Post } from './types'
import theme from './theme'
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

interface PostProps {
  route: any
  navigation: any
}

export const PostScreen = ({
  route,
  navigation,
}: PostProps): React.ReactElement => {
  const [selectedUser, setSelectedUser] = useState(1)

  const { post } = route.params

  if (!post) {
    return null
  }

  return (
    <Container>
      <TopBar>
        <Column>
          <H1>{}</H1>
          <S1>POST {post.id}</S1>
        </Column>
      </TopBar>
      <H1>Title:</H1>
      <S1>{post.title}</S1>
      <H1>Body:</H1>
      <S1>{post.body}</S1>
    </Container>
  )
}

/*export default connect(
  (state: State) => ({
    users: Selectors.userData(state),
    posts: Selectors.postData(state),
    // postsById: Selectors.postsById(state, user),
  }),
  (dispatch) => ({
    fetchUsers: () => dispatch(Actions.users.fetchUsers.trigger()),
    fetchPosts: () => dispatch(Actions.posts.fetchPosts.trigger()),
  })
)(PostScreen)*/

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`

const TopBar = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.contentBg};
  justify-content: space-between;
  flex-direction: row;
`

const Column = styled.View``

const Row = styled.View`
  flex-direction: row;
`

const ArrowIcon = styled(Ionicons)`
  margin: 0 ${({ theme }) => theme.space.md}px;
`

const H1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.basic};
`

const S1 = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.basic200};
`

const ListItem = styled.View`
  padding: 20px 10px;
  border-bottom-width: 1px;
`

const ListItemTitle = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.basic200};
`
