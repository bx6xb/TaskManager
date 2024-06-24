import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppStateType } from "./types"

export const slice = createSlice({
  name: "app",
  initialState: {
    error: null,
    isAppInitialized: false,
    isLoading: false,
  } as AppStateType,
  reducers: {
    setIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading
    },
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setIsAppInitialized(state, action: PayloadAction<{ isAppInitialized: boolean }>) {
      state.isAppInitialized = action.payload.isAppInitialized
    },
  },
})

export const appReducer = slice.reducer
export const { setIsLoading, setError, setIsAppInitialized } = slice.actions
