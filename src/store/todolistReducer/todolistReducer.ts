import { TododlistDomainType, todolistAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/ErrorHandlers"
import { setIsLoadingAC } from "../appReducer/appReducer"
import { ThunkType } from "../store"
import { createTasksForTodolistAC, deleteTasksTodolistAC } from "../tasksReducer/tasksReducer"

const initialState = [] as TodolistStateEntityType[]

export const todolistReducer = (
  state: TodolistStateEntityType[] = initialState,
  action: TodolistReducerActionType
): TodolistStateEntityType[] => {
  switch (action.type) {
    case "todolist/SET_TODOLISTS":
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    case "todolist/CREATE_TODOLIST":
      return [{ ...action.todolist, filter: "all" }, ...state]
    case "todolist/DELETE_TODOLIST":
      return state.filter((tl) => tl.id !== action.todolistId)
    case "todolist/UPDATE_TODOLIST_TITLE":
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, title: action.todolistTitle } : tl
      )
    default:
      return state
  }
}

// actions
export const setTodolistsAC = (todolists: TododlistDomainType[]) =>
  ({
    type: "todolist/SET_TODOLISTS",
    todolists,
  }) as const
export const createTodolistAC = (todolist: TododlistDomainType) =>
  ({
    type: "todolist/CREATE_TODOLIST",
    todolist,
  }) as const
export const deleteTodolistAC = (todolistId: string) =>
  ({
    type: "todolist/DELETE_TODOLIST",
    todolistId,
  }) as const
export const updateTodolistTitleAC = (todolistId: string, todolistTitle: string) =>
  ({
    type: "todolist/UPDATE_TODOLIST_TITLE",
    todolistId,
    todolistTitle,
  }) as const

// thunks
export const fetchTodolists = (): ThunkType => async (dispatch) => {
  dispatch(setIsLoadingAC(true))
  try {
    const response = await todolistAPI.fetchTodolists()
    dispatch(setTodolistsAC(response.data))
    dispatch(createTasksForTodolistAC(response.data))
  } catch (e: any) {
    networkErrorHandler(dispatch, e.message)
  }
  dispatch(setIsLoadingAC(false))
}
export const createTodolistTC =
  (todolistTitle: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
      const response = await todolistAPI.createTodolist(todolistTitle)
      if (response.data.resultCode === 0) {
        dispatch(createTodolistAC(response.data.data.item))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }
export const deleteTodolistTC =
  (todolistId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
      const response = await todolistAPI.deleteTodolist(todolistId)
      if (response.data.resultCode === 0) {
        dispatch(deleteTodolistAC(todolistId))
        dispatch(deleteTasksTodolistAC(todolistId))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }
export const updateTodolistTitleTC =
  (todolistId: string, todolistTitle: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
      const response = await todolistAPI.updateTodolistTitle(todolistId, todolistTitle)
      if (response.data.resultCode === 0) {
        dispatch(updateTodolistTitleAC(todolistId, todolistTitle))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }

// types
export type FilterType = "all" | "completed" | "active"
export type TodolistStateEntityType = {
  filter: FilterType
} & TododlistDomainType
export type TodolistReducerActionType =
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof updateTodolistTitleAC>
