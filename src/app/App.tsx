import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { useAppSelector } from './store.ts'
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx'

export const App = () => {
  const appStatus = useAppSelector((state) => state.app.status)
  return (
    <div>
      {appStatus === 'loading' && <LinearLoader />}
      <Decks />
      <GlobalError />
    </div>
  )
}
