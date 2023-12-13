import { isAxiosError } from 'axios'
import React from 'react'
import { Dispatch } from 'redux'
import { setAppErorr } from '../../app/app-reducer'

export const handleError = (e: unknown, dispatch: Dispatch) => {
  let errrorMessage: string
  if (isAxiosError<ServerError>(e)) {
    //case-1:case-2
    errrorMessage = e.response ? e.response.data.errorMessages[0].message : e.message
  } else {
    //case-3
    errrorMessage = (e as Error).message
  }

  dispatch(setAppErorr(errrorMessage))
}

type ServerError = {
  errorMessages: Array<{
    field: string
    message: string
  }>
}
