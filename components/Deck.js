import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform  } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {

  render() {
    return (
      <View style={styles.deck}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{this.props.deckTitle}</Text>
        <Text style={{fontSize: 18, color: 'gray', textAlign: 'center'}}>{this.props.numCards} cards</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    alignSelf:'stretch',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 20,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      height: 5
    },
  },
})

function mapStateToProps(decks, ownProps) {
  return {
    numCards: decks[ownProps.deckTitle].questions.length

  }
}

export default connect(mapStateToProps)(Deck)
