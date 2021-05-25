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

interface HomeProps {
  users: User[]
  posts: Post[]
  fetchUsers: () => void
  fetchPosts: () => void
}

export const Home = React.memo(
  ({ users, posts, fetchUsers, fetchPosts }: HomeProps): React.ReactElement => {
    const [selectedUser, setSelectedUser] = useState(1)
    const navigation = useNavigation()

    useEffect(() => {
      fetchUsers()
      fetchPosts()
    }, [])

    useEffect(() => {
      console.log(selectedUser, users[selectedUser])
    }, [selectedUser])

    const next = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      if (selectedUser > users.length - 2) {
        setSelectedUser(1)
      } else {
        setSelectedUser(selectedUser + 1)
      }
    }
    const prev = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      if (selectedUser < 1) return
      setSelectedUser(selectedUser - 1)
    }

    const selectPost = (post) => {
      navigation.navigate('PostScreen', {
        post: post,
      })
    }

    const renderPost = useCallback(
      ({ item }) => (
        <ListItem>
          <Text>{item?.title}</Text>
        </ListItem>
      ),
      []
    )

    if (!users.length) {
      return null
    }

    return (
      <Container>
        <TopBar>
          <Column>
            <H1>{users[selectedUser]?.name}</H1>
            <S1>{users[selectedUser]?.website}</S1>
          </Column>
          <Column>
            <Row>
              <TouchableOpacity onPress={prev}>
                <ArrowIcon
                  name='md-arrow-back'
                  size={32}
                  color={theme.colors.accent}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={next}>
                <ArrowIcon
                  name='md-arrow-forward'
                  size={32}
                  color={theme.colors.accent}
                />
              </TouchableOpacity>
            </Row>
          </Column>
        </TopBar>
        <FlatList
          style={{ flex: 1 }}
          data={posts.filter((post) => post.userId === selectedUser)}
          renderItem={({ item }) => (
            <ListItem onPress={() => selectPost(item)}>
              <Text>{item?.title}</Text>
            </ListItem>
          )}
          keyExtractor={(item) => `${item?.id}`}
        />
      </Container>
    )
  }
)

export default connect(
  (state: State) => ({
    users: Selectors.userData(state),
    posts: Selectors.postData(state),
    // postsById: Selectors.postsById(state, user),
  }),
  (dispatch) => ({
    fetchUsers: () => dispatch(Actions.users.fetchUsers.trigger()),
    fetchPosts: () => dispatch(Actions.posts.fetchPosts.trigger()),
  })
)(Home)

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

const ListItem = styled.TouchableOpacity`
  padding: 20px 10px;
  border-bottom-width: 1px;
`

const ListItemTitle = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.basic200};
`
