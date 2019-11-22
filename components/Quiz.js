//https://snack.expo.io/@dols3m/keyboardavoidingview
import React, { Component } from 'react'
import { Text, Button, StatusBar, TextInput, KeyboardAvoidingView, View, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import CardFlip from 'react-native-card-flip'
import { clearLocalNotification, setLocalNotification } from '../utils/api'


export default class Quiz extends Component {
  state = {
    deck: this.props.navigation.state.params.deck,
    card: this.props.navigation.state.params.deck.questions[0],
    correct: 0,
    finished: false,
  }
  handleCorrect = () => {
    const { deck, card } = this.state
    const nextIndex = deck.questions.indexOf(card)+1
    if(nextIndex < deck.questions.length) {
      this.setState(() => ({
        card: deck.questions[nextIndex],
        correct: this.state.correct+1
      }))
    }
    else {
      clearLocalNotification()
      .then(setLocalNotification)
      this.setState(() => ({
        correct: this.state.correct+1,
        finished: true
      }))

    }

  }

  handleIncorrect = () => {
    const { deck, card } = this.state
    const nextIndex = deck.questions.indexOf(card)+1
    if(nextIndex < deck.questions.length) {
      this.setState(() => ({
        card: deck.questions[nextIndex],
      }))
    }
    else {
      clearLocalNotification()
      .then(setLocalNotification)
      this.setState(() => ({
        finished: true
      }))
    }
  }

  handleRestart = () => {
    this.setState(() => ({
      deck: this.props.navigation.state.params.deck,
      card: this.props.navigation.state.params.deck.questions[0],
      correct: 0,
      finished: false,
    }))
  }

  render() {
    const { deck, card, finished } = this.state
    const cardIndex = deck.questions.indexOf(card)
    if(deck.questions.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={{padding: 10}}>No cards to start with 😀</Text>
        </View>
      )
    }
    if(finished){
      return (
        <View style={styles.center}>
          <Text style={{padding: 10}}>Your score is {this.state.correct}.</Text>
          <TouchableOpacity style={[styles.btn, {backgroundColor: '#F7811B'}]} onPress={this.handleRestart}>
            <Text style={{color: 'white', textAlign:'center', fontSize:16}}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, {backgroundColor: '#336699'}]} onPress={() => this.props.navigation.navigate('DeckDetail', { deckTitle: deck.title })}>
            <Text style={{color: 'white', textAlign:'center', fontSize:16}}>Back to deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={() => this.card.flip()}>
          <Text style={{color: 'grey', textAlign:'center', fontSize:16}}>💡 show/hide Answer</Text>
        </TouchableOpacity>
        <View style={styles.containerQA}>
          <Text style={{color: '#d6d6d6', textAlign:'center', fontSize:14, marginBottom: 4}}>
            card {cardIndex+1} out of {deck.questions.length}
          </Text>
          <CardFlip ref={(card) => this.card = card}>
            <Text style={{color: 'white', textAlign:'center', fontSize:14}}>
              {card.question}
            </Text>
            <Text style={{color: 'white', textAlign:'center', fontSize:14}}>
              Answer is: {card.answer}
            </Text>
          </CardFlip>
        </View>
        <TouchableOpacity style={[styles.btn, {backgroundColor: 'green'}]} onPress={this.handleCorrect}>
          <Text style={{color: 'white', textAlign:'center', fontSize:16}}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, {backgroundColor: '#DC143C'}]} onPress={this.handleIncorrect}>
          <Text style={{color: 'white', textAlign:'center', fontSize:16}}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf:'stretch',
    backgroundColor: '#ecf0f1',
  },
  header: {
    paddingTop: 20 + Constants.statusBarHeight,
    padding: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginBottom: 8,
    marginLeft: 50,
    marginRight: 50,
  },
  containerQA: {
    backgroundColor: '#336699',
    padding: 10,
    paddingTop: 5,
    height: 350,
    borderRadius: 7,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    margin: 30,

  },
})
