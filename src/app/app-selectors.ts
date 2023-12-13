import { AppRootState } from './store'

export const selectAppEror = (state: AppRootState) => state.app.error
