import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { selectAppEror } from '../app-selectors'
import { setAppErorr } from '../app-reducer'
import { useAppDispatch } from '../store'

export const GlobalError = () => {
  const errorMessage = useSelector(selectAppEror)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      toast.onChange(({ status }) => {
        if (status === 'added') {
          dispatch(setAppErorr(null))
        }
      })
    }

    console.log(errorMessage)
  }, [errorMessage])

  return <ToastContainer theme="dark" autoClose={3000} />
}
