import { authAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/ErrorHandlers"
import { ThunkType } from "../store"

const initialState = {} as AppStateType

export const appReducer = (
  state: AppStateType = initialState,
  action: AppActionType
): AppStateType => {
  switch (action.type) {
    case "app/SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case "app/SET_ERROR":
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

// actions
export const setIsLoadingAC = (isLoading: boolean) =>
  ({
    type: "app/SET_IS_LOADING",
    isLoading,
  }) as const
export const setErrorAC = (error: string) =>
  ({
    type: "app/SET_ERROR",
    error,
  }) as const
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
      serverErrorHandler(dispatch, response.data)
    }
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC(false))
}
export const login =
  (email: string, password: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
      const response = await authAPI.login(email, password)
      if (response.data.resultCode === 0) {
        dispatch(setIsAuthorizedAC(true))
      } else {
        serverErrorHandler(dispatch, response.data)
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }
export const logout = (): ThunkType => async (dispatch) => {
  dispatch(setIsLoadingAC(true))
  try {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(setIsAuthorizedAC(false))
    } else {
      serverErrorHandler(dispatch, response.data)
    }
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC(false))
}

// types
export type AppStateType = {
  isLoading: boolean
  error: string
  isAuthorized: boolean
}
export type AppActionType =
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setIsAuthorizedAC>
