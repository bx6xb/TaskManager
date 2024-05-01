import { LoginDataType, authAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/ErrorHandlers"
import { setIsAppInitializedAC, setIsLoadingAC } from "../appReducer/appReducer"
import { ThunkType } from "../store"

const initialState = {} as LoginStateType

export const loginReducer = (
  state: LoginStateType = initialState,
  action: LoginReducerActionType
): LoginStateType => {
  switch (action.type) {
    case "app/SET_IS_AUTHORIZED":
      return {
        ...state,
        isAuthorized: action.isAuthorized,
      }
    default:
      return state
  }
}

// actions
export const setIsAuthorizedAC = (isAuthorized: boolean) =>
  ({
    type: "app/SET_IS_AUTHORIZED",
    isAuthorized,
  }) as const

// thunks
export const authTC = (): ThunkType => async (dispatch) => {
  dispatch(setIsLoadingAC(true))
  try {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
      dispatch(setIsAuthorizedAC(true))
    } else {
      serverErrorHandler(dispatch, response.data.messages[0])
    }
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC(false))
  dispatch(setIsAppInitializedAC(true))
}
export const loginTC =
  (data: LoginDataType): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
      const response = await authAPI.login(data)
      if (response.data.resultCode === 0) {
        dispatch(setIsAuthorizedAC(true))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }
export const logoutTC = (): ThunkType => async (dispatch) => {
  dispatch(setIsLoadingAC(true))
  try {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(setIsAuthorizedAC(false))
    } else {
      serverErrorHandler(dispatch, response.data.messages[0])
    }
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC(false))
}

// types
export type LoginStateType = {
  isAuthorized: boolean
}
export type LoginReducerActionType = ReturnType<typeof setIsAuthorizedAC>
