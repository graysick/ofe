import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Home from './Home'
import { PostScreen } from './Post'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator()

const options = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName

    if (route.name === 'OFE') {
      iconName = focused
        ? 'ios-information-circle'
        : 'ios-information-circle-outline'
    } else if (route.name === 'Settings') {
      iconName = focused ? 'ios-list-box' : 'ios-list'
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />
  },
})

const Stack = createStackNavigator()

const PostStack = () => (
  <Stack.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}
  >
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='PostScreen' component={PostScreen} />
  </Stack.Navigator>
)

export default () => (
  <Tab.Navigator
    screenOptions={options}
    tabBarOptions={{
      activeTintColor: '#a59bef',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name='OFE' component={PostStack} />
  </Tab.Navigator>
)
