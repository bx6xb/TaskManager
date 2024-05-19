import { Dispatch } from "redux"
import { setErrorAC } from "../store/appReducer/appReducer"

export const networkErrorHandler = (dispatch: Dispatch, errorMessage: string) => {
  dispatch(setErrorAC({ error: errorMessage }))
}
export const serverErrorHandler = (dispatch: Dispatch, errorMessage: string) => {
  dispatch(setErrorAC({ error: errorMessage }))
}
