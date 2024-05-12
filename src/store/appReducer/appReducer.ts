import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: AppStateType = {
  error: null,
  isAppInitialized: false,
  isLoading: false,
}

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoadingAC(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading
    },
    setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setIsAppInitializedAC(state, action: PayloadAction<{ isAppInitialized: boolean }>) {
      state.isAppInitialized = action.payload.isAppInitialized
    },
  },
})

export const appReducer = slice.reducer
export const { setIsLoadingAC, setErrorAC, setIsAppInitializedAC } = slice.actions

// types
export type AppStateType = {
  isLoading: boolean
  error: string | null
  isAppInitialized: boolean
}
export type AppActionType =
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setIsAppInitializedAC>
