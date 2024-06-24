import { Dispatch } from "redux"
import { setError } from "../store/appReducer/appReducer"

export const errorHandler = (dispatch: Dispatch, errorMessage: string) => {
  dispatch(setError({ error: errorMessage }))
}
