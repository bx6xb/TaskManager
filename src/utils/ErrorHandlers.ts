import { Dispatch } from "redux"
import { setError } from "../store/appReducer/appReducer"

export const networkErrorHandler = (dispatch: Dispatch, errorMessage: string) => {
  dispatch(setError({ error: errorMessage }))
}
export const serverErrorHandler = (dispatch: Dispatch, errorMessage: string) => {
  dispatch(setError({ error: errorMessage }))
}
