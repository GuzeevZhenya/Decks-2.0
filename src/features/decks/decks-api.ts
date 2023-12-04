import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://api.flashcards.andrii.es/v1/',
  headers: {
    'x-auth-skip': true,
  },
})

export const decksAPI = {
  getDecks() {
    return instance.get<RootInterface>('decks')
  },
  sendDecks(params: AddDeckParam) {
    return instance.post('decks', params)
  },
  removeDeck(id: string) {
    return instance.delete(`decks/${id}`)
  },
}

export type AddDeckParam = {
  name: string
}

export interface RootInterface {
  items: Deck[]
  pagination: Pagination
  maxCardsCount: number
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export interface Deck {
  author: Author
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export interface Author {
  id: string
  name: string
}
