//https://snack.expo.io/@dols3m/keyboardavoidingview
import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { createDeck } from '../actions'


class NewDeck extends Component {
  state = {
    title: '',
  }

  handleSubmit = () => {
    saveDeckTitle(this.state.title)
      .then(() => {
        this.props.dispatch(createDeck(this.state.title))
        this.props.navigation.navigate('DeckDetail', { deckTitle: this.state.title })
        this.setState(() => ({
          title: '',
        }))
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize:26, textAlign:'center'}}>
            Add New Deck
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <Text style={{textAlign: 'center', margin:5}}>
            What is the title of the new deck?
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.title}
            onChangeText={title => this.setState({title})}
            placeholder="Deck title"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="send"
            onSubmitEditing={this._submit}
            blurOnSubmit={true}
          />
          <View>
            <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit} disabled={this.state.title === '' ? true : false}>
              <Text style={{color: 'white', textAlign:'center', fontSize:16}}>Add</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    paddingTop: 20,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    margin: 20,
    marginBottom: 0,
    marginTop: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  form: {
    flex: 1,
  },
  submitBtn: {
    backgroundColor: '#336699',
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 20,
    marginLeft: 50,
    marginRight: 50,
  }
})

export default connect()(NewDeck)
