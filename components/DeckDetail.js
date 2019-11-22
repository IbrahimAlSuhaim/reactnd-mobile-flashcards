import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'
import Deck from './Deck'
import { connect } from 'react-redux'

class DeckDetail extends Component {

  render() {
    const { deck, deckTitle, numCards } = this.props
    return (
      <View style={styles.container}>
        <Deck deckTitle={deckTitle} />
        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('NewCard', { title: deckTitle})}>
          <Text style={{color: 'white', textAlign:'center', fontSize:16}}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Quiz', { deck: deck})}>
          <Text style={{color: 'white', textAlign:'center', fontSize:16}}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#336699',
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 100,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 50,
    marginRight: 50,
  },
})

function mapStateToProps(decks, ownProps) {
    return {
      deck: decks[ownProps.navigation.state.params.deckTitle],
      deckTitle: ownProps.navigation.state.params.deckTitle,
      numCards: decks[ownProps.navigation.state.params.deckTitle].questions.length
    }
}

export default connect(mapStateToProps)(DeckDetail)
