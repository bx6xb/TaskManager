import { ResponseType } from "../api/api"
import { setErrorAC } from "../redux/appReducer/appReducer"
import { DispatchType } from "../redux/store"

export const networkErrorHandler = (dispatch: DispatchType, errorMessage: string) => {
  dispatch(setErrorAC(errorMessage))
}
export const serverErrorHandler = (dispatch: DispatchType, data: ResponseType) => {
  dispatch(setErrorAC(data.messages[0]))
}
