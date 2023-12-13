import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatus } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'
import { handleError } from '../../common/utils/handle-error.ts'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatus('succeeded'))
  } catch (error) {
    dispatch(setAppStatus('failed'))
  }
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

//case-1: ошибки бекенда(на стороне бекенда). Ошибку создает axios, а e.response.data помещает ответ сервера
//case-2: network error - axios создает объект ошибки, сообщение можно взять из поля e.message
//case-3: cинхронные ошибки - создается "нативная" JS-ошибка, имеет поле message

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {
    handleError(e, dispatch)
  }
}
