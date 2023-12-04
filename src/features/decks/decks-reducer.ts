import { AnyAction, Dispatch } from 'redux'
import { AddDeckParam, Deck, decksAPI } from './decks-api'
import { AppDispatch, AppRootState } from '../../app/store'
import { ThunkAction } from 'redux-thunk'

const initialState = {
  decks: [] as Deck[], // todo: add type
  searchParams: {
    name: '',
  },
}

type DecksState = typeof initialState

export const decksReducer = (state: DecksState = initialState, action: DecksActions): DecksState => {
  switch (action.type) {
    case 'SET-DECKS':
      return {
        ...state,
        decks: action.decks,
      }
    case 'SEND-DECKS':
      return {
        ...state,
        decks: [action.deck, ...state.decks],
      }
    case 'REMOVE-DECKS':
      return { ...state, decks: state.decks.filter((deck) => deck.id !== action.id) }

    default:
      return state
  }
}

type DecksActions = ReturnType<typeof setDecksAC> | ReturnType<typeof sendDecksAC> | ReturnType<typeof removeDecksAC>

export const setDecksAC = (decks: Deck[]) => ({
  type: 'SET-DECKS' as const,
  decks,
})

export const sendDecksAC = (deck: Deck) => ({
  type: 'SEND-DECKS' as const,
  deck,
})

export const removeDecksAC = (id: string) => ({
  type: 'REMOVE-DECKS' as const,
  id,
})

export const setDecksTC = (): ThunkAction<void, AppRootState, unknown, AnyAction> => async (dispatch: AppDispatch) => {
  return decksAPI.getDecks().then((res) => dispatch(setDecksAC(res.data.items)))
}

export const sendDecksTC = (params: AddDeckParam) => async (dispatch: AppDispatch) => {
  return decksAPI.sendDecks(params).then((res) => dispatch(sendDecksAC(res.data)))
}

export const removeDecksTC = (id: string) => async (dispatch: AppDispatch) => {
  return decksAPI.removeDeck(id).then(() => dispatch(setDecksTC()))
}
