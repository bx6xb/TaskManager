import { ResponseType } from "../api/api"
import { setErrorAC } from "../store/appReducer/appReducer"
import { DispatchType } from "../store/store"

export const networkErrorHandler = (dispatch: DispatchType, errorMessage: string) => {
  dispatch(setErrorAC(errorMessage))
}
export const serverErrorHandler = (dispatch: DispatchType, errorMessage: string) => {
  dispatch(setErrorAC(errorMessage))
}
