//https://snack.expo.io/@dols3m/keyboardavoidingview
import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }
  handleSubmit = () => {
    const card = { question: this.state.question , answer: this.state.answer }
    const { title } = this.props.navigation.state.params
    addCardToDeck(title, card)
      .then(() => {
        this.props.dispatch(addCard(title, card))
        this.setState(() => ({
          question: '',
          answer: '',
        }))
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize:26, textAlign:'center'}}>
            Add New Card
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <TextInput
            style={styles.input}
            value={this.state.question}
            onChangeText={question => this.setState({question})}
            placeholder="question"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="send"
            blurOnSubmit={true}
          />
          <TextInput
            style={styles.input}
            value={this.state.answer}
            onChangeText={answer => this.setState({answer})}
            placeholder="answer"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="send"
            blurOnSubmit={true}
          />
          <View>
            <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}
            disabled={this.state.question === '' || this.state.answer === ''? true : false}>
              <Text style={{color: 'white', textAlign:'center', fontSize:16}}>Submit</Text>
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


export default connect()(NewCard)
