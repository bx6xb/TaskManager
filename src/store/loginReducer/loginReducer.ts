import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FieldsErrorsType, LoginDataType, authAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/errorHandlers"
import { setIsAppInitializedAC, setIsLoadingAC } from "../appReducer/appReducer"

// thunks
export const authTC = createAsyncThunk(
  "login/auth",
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await authAPI.me()
      if (response.data.resultCode === 0) {
        return { isAuthorized: true }
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }))
      dispatch(setIsAppInitializedAC({ isAppInitialized: true }))
    }
  }
)
export const loginTC = createAsyncThunk<
  { isAuthorized: boolean },
  LoginDataType,
  { rejectValue: { errors: string[]; fieldsErrors?: FieldsErrorsType[] } }
>("login/login", async (data: LoginDataType, { dispatch, rejectWithValue }) => {
  dispatch(setIsLoadingAC({ isLoading: true }))
  try {
    const response = await authAPI.login(data)
    if (response.data.resultCode === 0) {
      return { isAuthorized: true }
    } else {
      serverErrorHandler(dispatch, response.data.messages[0])
      return rejectWithValue({
        errors: response.data.messages,
        fieldsErrors: response.data.fieldsErrors,
      })
    }
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
    return rejectWithValue({
      errors: ["Network error"],
      fieldsErrors: undefined,
    })
  } finally {
    dispatch(setIsLoadingAC({ isLoading: false }))
  }
})
export const logoutTC = createAsyncThunk(
  "login/logout",
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await authAPI.logout()
      if (response.data.resultCode === 0) {
        return { isAuthorized: false }
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }))
    }
  }
)

const slice = createSlice({
  name: "login",
  initialState: {
    isAuthorized: false,
  },
  reducers: {
    setIsAuthorizedAC(state, action: PayloadAction<{ isAuthorized: boolean }>) {
      state.isAuthorized = action.payload.isAuthorized
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authTC.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthorized: action.payload.isAuthorized,
        }
      })
      .addCase(loginTC.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthorized: action.payload.isAuthorized,
        }
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthorized: action.payload.isAuthorized,
        }
      })
  },
})

export const loginReducer = slice.reducer
export const { setIsAuthorizedAC } = slice.actions

// types
export type LoginReducerActionType = ReturnType<typeof setIsAuthorizedAC>
