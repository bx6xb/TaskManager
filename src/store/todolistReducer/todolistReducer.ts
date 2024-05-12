import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TododlistDomainType, todolistAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/ErrorHandlers"
import { setIsLoadingAC } from "../appReducer/appReducer"
import { ThunkType } from "../store"
import { createTasksForTodolistAC } from "../tasksReducer/tasksReducer"

const initialState = [] as TodolistEntityType[]

const slice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    setTodolistsAC(state, action: PayloadAction<{ todolists: TododlistDomainType[] }>) {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    },
    createTodolistAC(state, action: PayloadAction<{ todolist: TododlistDomainType }>) {
      return [{ ...action.payload.todolist, filter: "all", entityStatus: "idle" }, ...state]
    },
    deleteTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      return state.filter((tl) => tl.id !== action.payload.todolistId)
    },
    updateTodolistTitleAC(
      state,
      action: PayloadAction<{ todolistId: string; todolistTitle: string }>
    ) {
      return state.map((tl) =>
        tl.id === action.payload.todolistId ? { ...tl, title: action.payload.todolistTitle } : tl
      )
    },
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
})

export const todolistReducer = slice.reducer
export const {
  setTodolistsAC,
  createTodolistAC,
  deleteTodolistAC,
  updateTodolistTitleAC,
  updateTodolistStatusAC,
  updateTodolistFilterAC,
} = slice.actions

// thunks
export const fetchTodolistsTC = (): ThunkType => async (dispatch) => {
  dispatch(setIsLoadingAC({ isLoading: true }))
  try {
    const response = await todolistAPI.fetchTodolists()
    dispatch(setTodolistsAC({ todolists: response.data }))
    dispatch(createTasksForTodolistAC({ todolists: response.data }))
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC({ isLoading: false }))
}
export const createTodolistTC =
  (todolistTitle: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await todolistAPI.createTodolist(todolistTitle)
      if (response.data.resultCode === 0) {
        dispatch(createTodolistAC({ todolist: response.data.data.item }))
        dispatch(createTasksForTodolistAC({ todolists: [response.data.data.item] }))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC({ isLoading: false }))
  }
export const deleteTodolistTC =
  (todolistId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "loading" }))
    try {
      const response = await todolistAPI.deleteTodolist(todolistId)
      if (response.data.resultCode === 0) {
        dispatch(deleteTodolistAC({ todolistId }))
        // dispatch(deleteTasksTodolistAC({ todolistId }))
        dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "succeeded" }))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
        dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "canceled" }))
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "canceled" }))
    }
    dispatch(setIsLoadingAC({ isLoading: false }))
  }
export const updateTodolistTitleTC =
  (todolistId: string, todolistTitle: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "loading" }))
    try {
      const response = await todolistAPI.updateTodolistTitle(todolistId, todolistTitle)
      if (response.data.resultCode === 0) {
        dispatch(updateTodolistTitleAC({ todolistId, todolistTitle }))
        dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "succeeded" }))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
        dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "canceled" }))
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      dispatch(updateTodolistStatusAC({ todolistId, entityStatus: "canceled" }))
    }
    dispatch(setIsLoadingAC({ isLoading: false }))
  }

// types
export type FilterType = "all" | "completed" | "active"
export type EntityStatusType = "idle" | "loading" | "succeeded" | "canceled"
export type TodolistEntityType = {
  filter: FilterType
  entityStatus: EntityStatusType
} & TododlistDomainType
export type TodolistReducerActionType =
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof updateTodolistTitleAC>
  | ReturnType<typeof updateTodolistStatusAC>
  | ReturnType<typeof updateTodolistFilterAC>
