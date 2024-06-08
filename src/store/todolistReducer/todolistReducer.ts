import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TododlistDomainType } from "../../api/api"
import { logout } from "../loginReducer/loginReducer"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { setIsLoading } from "../appReducer/appReducer"
import { todolistAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/errorHandlers"

export const fetchTodolists = createAsyncThunk(
  "todolist/fetchTodolists",
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading({ isLoading: true }))
    try {
      const response = await todolistAPI.fetchTodolists()
      return { todolists: response.data }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoading({ isLoading: false }))
    }
  },
)
export const createTodolist = createAsyncThunk(
  "todolist/createTodolist",
  async (todolistTitle: string, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading({ isLoading: true }))
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
      dispatch(setIsLoading({ isLoading: false }))
    }
  },
)
export const deleteTodolist = createAsyncThunk(
  "todolist/deleteTodolist",
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading({ isLoading: true }))
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
      dispatch(setIsLoading({ isLoading: false }))
    }
  },
)
export const updateTodolistTitle = createAsyncThunk(
  "todolist/updateTodolistTitle",
  async (
    { todolistId, todolistTitle }: { todolistId: string; todolistTitle: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setIsLoading({ isLoading: true }))
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
      dispatch(setIsLoading({ isLoading: false }))
    }
  },
)

export const asyncActions = {
  fetchTodolists,
  createTodolist,
  deleteTodolist,
  updateTodolistTitle,
}

export const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistEntityType[],
  reducers: {
    updateTodolistStatusAC(
      state,
      action: PayloadAction<{ todolistId: string; entityStatus: EntityStatusType }>,
    ) {
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? { ...tl, entityStatus: action.payload.entityStatus }
          : tl,
      )
    },
    updateTodolistFilter(state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) {
      return state.map((tl) =>
        tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl,
      )
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }))
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        return [{ ...action.payload.todolist, filter: "all", entityStatus: "idle" }, ...state]
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        return state.filter((tl) => tl.id !== action.payload.todolistId)
      })
      .addCase(updateTodolistTitle.fulfilled, (state, action) => {
        return state.map((tl) =>
          tl.id === action.payload.todolistId ? { ...tl, title: action.payload.todolistTitle } : tl,
        )
      })
      .addCase(logout.fulfilled, () => []) // clears state
  },
})

export const todolistReducer = slice.reducer
export const { updateTodolistFilter, updateTodolistStatusAC } = slice.actions

// types
export type FilterType = "all" | "completed" | "active"
export type EntityStatusType = "idle" | "loading" | "succeeded" | "canceled"
export type TodolistEntityType = {
  filter: FilterType
  entityStatus: EntityStatusType
} & TododlistDomainType
