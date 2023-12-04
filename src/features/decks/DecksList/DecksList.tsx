import { useEffect, useState } from 'react'
import s from './DecksList.module.css'
import { decksAPI } from '../decks-api'
import { DeckItem } from './DeckItem/DeckItem'
import { setDecksTC } from '../decks-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { selectDecks } from '../decks-selectors'

export const DecksList = () => {
  const dispatch = useAppDispatch()
  const decks = useAppSelector(selectDecks)

  useEffect(() => {
    dispatch(setDecksTC())
  }, [dispatch])


  return (
    <ul className={s.list}>
      {decks && decks.map((deck) => {
        return <DeckItem deck={deck} key={deck.id} />
      })}
    </ul>
  )
}
