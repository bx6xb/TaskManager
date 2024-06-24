import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../../api/api"
import { errorHandler } from "../../utils/errorHandler"
import { setIsAppInitialized, setIsLoading } from "../appReducer/appReducer"
import { FieldsErrorsType, LoginDataType } from "../../api/types"

// thunks
export const auth = createAsyncThunk(
  "login/auth",
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading({ isLoading: true }))
    try {
      const response = await authAPI.me()
      if (response.data.resultCode === 0) {
        return { isAuthorized: true }
      } else {
        errorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(response.data.messages[0])
      }
    } catch (err: any) {
      const error = err as Error
      errorHandler(dispatch, error.message)
      return rejectWithValue(error.message)
    } finally {
      dispatch(setIsLoading({ isLoading: false }))
      dispatch(setIsAppInitialized({ isAppInitialized: true }))
    }
  },
)
export const login = createAsyncThunk<
  { isAuthorized: boolean },
  LoginDataType,
  { rejectValue: { errors: string[]; fieldsErrors?: FieldsErrorsType[] } }
>("login/login", async (data: LoginDataType, { dispatch, rejectWithValue }) => {
  dispatch(setIsLoading({ isLoading: true }))
  try {
    const response = await authAPI.login(data)
    if (response.data.resultCode === 0) {
      return { isAuthorized: true }
    } else {
      errorHandler(dispatch, response.data.messages[0])
      return rejectWithValue({
        errors: response.data.messages,
        fieldsErrors: response.data.fieldsErrors,
      })
    }
  } catch (err: any) {
    const error = err as Error
    errorHandler(dispatch, error.message)
    return rejectWithValue({
      errors: ["Network error"],
      fieldsErrors: undefined,
    })
  } finally {
    dispatch(setIsLoading({ isLoading: false }))
  }
})
export const logout = createAsyncThunk(
  "login/logout",
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading({ isLoading: true }))
    try {
      const response = await authAPI.logout()
      if (response.data.resultCode === 0) {
        return { isAuthorized: false }
      } else {
        errorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(response.data.messages[0])
      }
    } catch (err: any) {
      const error = err as Error
      errorHandler(dispatch, error.message)
      return rejectWithValue(error.message)
    } finally {
      dispatch(setIsLoading({ isLoading: false }))
    }
  },
)

export const asyncActions = {
  auth,
  login,
  logout,
}

export const slice = createSlice({
  name: "login",
  initialState: {
    isAuthorized: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthorized: action.payload.isAuthorized,
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthorized: action.payload.isAuthorized,
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthorized: action.payload.isAuthorized,
        }
      })
  },
})

export const loginReducer = slice.reducer
