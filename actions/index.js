export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function createDeck (deck) {
  return {
    type: CREATE_DECK,
    deck
  }
}

export function addCard(title, card){
  return {
    type: ADD_CARD,
    title,
    card
  }
}
