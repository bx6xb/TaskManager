import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TododlistDomainType, todolistAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/errorHandlers"
import { setIsLoadingAC } from "../appReducer/appReducer"

// thunks
export const fetchTodolistsTC = createAsyncThunk(
  "todolist/fetchTodolists",
  async (payload, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await todolistAPI.fetchTodolists()
      return { todolists: response.data }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }))
    }
  }
)
export const createTodolistTC = createAsyncThunk(
  "todolist/createTodolist",
  async (payload: { todolistTitle: string }, thunkAPI) => {
    const { todolistTitle } = payload
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await todolistAPI.createTodolist(todolistTitle)
      if (response.data.resultCode === 0) {
        return { todolist: response.data.data.item }
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
export const deleteTodolistTC = createAsyncThunk(
  "todolist/deleteTodolist",
  async (payload: { todolistId: string }, thunkAPI) => {
    const { todolistId } = payload
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(setIsLoadingAC({ isLoading: true }))
    dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "loading" }))
    try {
      const response = await todolistAPI.deleteTodolist(todolistId)
      if (response.data.resultCode === 0) {
        dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "succeeded" }))
        return { todolistId }
      } else {
        dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "canceled" }))
        serverErrorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(response.data.messages[0])
      }
    } catch (e: any) {
      dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "canceled" }))
      networkErrorHandler(dispatch, e.message)
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }))
    }
  }
)
export const updateTodolistTitleTC = createAsyncThunk(
  "todolist/updateTodolistTitle",
  async (payload: { todolistId: string; todolistTitle: string }, thunkAPI) => {
    const { todolistId, todolistTitle } = payload
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(setIsLoadingAC({ isLoading: true }))
    dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "loading" }))
    try {
      const response = await todolistAPI.updateTodolistTitle(todolistId, todolistTitle)
      if (response.data.resultCode === 0) {
        dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "succeeded" }))
        return { todolistId, todolistTitle }
      } else {
        dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "canceled" }))
        serverErrorHandler(dispatch, response.data.messages[0])
        return rejectWithValue(response.data.messages[0])
      }
    } catch (e: any) {
      dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "canceled" }))
      networkErrorHandler(dispatch, e.message)
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }))
    }
  }
)

const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistEntityType[],
  reducers: {
    updateTodolistStatusAC(
      state,
      action: PayloadAction<{ todolistId: string; entityStatus: EntityStatusType }>
    ) {
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? { ...tl, entityStatus: action.payload.entityStatus }
          : tl
      )
    },
    updateTodolistFilterAC(
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterType }>
    ) {
      return state.map((tl) =>
        tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl
      )
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }))
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        return [{ ...action.payload.todolist, filter: "all", entityStatus: "idle" }, ...state]
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        return state.filter((tl) => tl.id !== action.payload.todolistId)
      })
      .addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
        return state.map((tl) =>
          tl.id === action.payload.todolistId ? { ...tl, title: action.payload.todolistTitle } : tl
        )
      })
  },
})

export const todolistReducer = slice.reducer
export const { updateTodolistStatusAC, updateTodolistFilterAC } = slice.actions

// types
export type FilterType = "all" | "completed" | "active"
export type EntityStatusType = "idle" | "loading" | "succeeded" | "canceled"
export type TodolistEntityType = {
  filter: FilterType
  entityStatus: EntityStatusType
} & TododlistDomainType
export type TodolistReducerActionType =
  | ReturnType<typeof updateTodolistStatusAC>
  | ReturnType<typeof updateTodolistFilterAC>
