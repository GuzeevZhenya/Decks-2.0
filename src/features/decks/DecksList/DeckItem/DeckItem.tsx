import { useAppDispatch } from '../../../../app/store'
import { Deck } from '../../decks-api'
import { removeDecksTC } from '../../decks-reducer'
import s from './DeckItem.module.css'

type DeckProps = {
  deck: Deck // todo: fix
}

const TEST_ACC_NAME = 'testNameOne'

export const DeckItem = ({ deck }: DeckProps) => {
  const isTestingDeck = deck.author.name === TEST_ACC_NAME
  const dispatch = useAppDispatch()

  const removeDeck = (id: string) => {
    console.log(id)
    dispatch(removeDecksTC(id))
  }

  console.log(s)
  return (
    <li className={s.item}>
      <h3 className={s.title}>
        {deck.name}
        {isTestingDeck && '✨'}
      </h3>
      <p className={s.characteristic}>
        <b>Author:</b> {deck.author.name}
      </p>
      <p className={s.characteristic}>
        <b>Created:</b> {new Date(deck.created).toLocaleString('ru-Ru')}
      </p>
      <p className={s.characteristic}>
        <b>Updated:</b> {new Date(deck.updated).toLocaleString('ru-Ru')}
      </p>

      {isTestingDeck && (
        <div className={s.buttonBox}>
          <button>update</button>
          <button onClick={() => removeDeck(deck.id)}>delete</button>
        </div>
      )}
    </li>
  )
}
