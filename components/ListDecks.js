import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { getDecks } from '../utils/api'
import Deck from './Deck'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'


class ListDecks extends Component {
  componentDidMount() {
    getDecks().then((results) => {
        this.props.dispatch(receiveDecks(results))
      })
  }
  render() {
    const { decks } = this.props
    if(Object.keys(decks).length === 0) {
      return (
        <View style={styles.center}>
          <Text style={{padding: 10}}>add new deck first 😀</Text>
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
        data={Object.keys(decks)}
        renderItem={ deck => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', { deckTitle: deck.item })}>
              <Deck deckTitle={deck.item} />
            </TouchableOpacity>
        )}
        keyExtractor={deck => deck}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf:'stretch',
    backgroundColor: '#ecf0f1',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    margin: 30,

  },
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(ListDecks)
