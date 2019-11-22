import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import ListDecks from './components/ListDecks'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import Constants from 'expo-constants'
import { Entypo } from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/api'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  ListDecks: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Entypo name='list' size={30} color={tintColor} />
      )
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: ({ tintColor }) => (
        <Entypo name='add-to-list' size={30} color={tintColor} />
      )
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: '#336699' ,
    style: {
      height: 56,
      backgroundColor: 'white',
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)

const TabsContainer = createAppContainer(Tabs)

const MainNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null,
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor:'#336699',
      },
    }),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor:'#336699',
      },
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor:'#336699',
      },
    }),
  },
}))

class App extends Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {

    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor='#336699' barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

export default App
