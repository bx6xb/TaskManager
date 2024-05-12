import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LoginDataType, authAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/ErrorHandlers"
import { setIsAppInitializedAC, setIsLoadingAC } from "../appReducer/appReducer"

const initialState = {
  isAuthorized: false,
}

const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setIsAuthorizedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isAuthorized = action.payload.value
    },
  },
})

export const loginReducer = slice.reducer
export const { setIsAuthorizedAC } = slice.actions

// thunks
export const authTC = () => async (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC({ isLoading: true }))
  try {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
      dispatch(setIsAuthorizedAC({ value: true }))
    } else {
      serverErrorHandler(dispatch, response.data.messages[0])
    }
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC({ isLoading: false }))
  dispatch(setIsAppInitializedAC({ isAppInitialized: true }))
}
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC({ isLoading: true }))
  try {
    const response = await authAPI.login(data)
    if (response.data.resultCode === 0) {
      dispatch(setIsAuthorizedAC({ value: true }))
    } else {
      serverErrorHandler(dispatch, response.data.messages[0])
    }
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC({ isLoading: false }))
}
export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC({ isLoading: true }))
  try {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(setIsAuthorizedAC({ value: false }))
    } else {
      serverErrorHandler(dispatch, response.data.messages[0])
    }
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC({ isLoading: false }))
}

// types
export type LoginReducerActionType = ReturnType<typeof setIsAuthorizedAC>
