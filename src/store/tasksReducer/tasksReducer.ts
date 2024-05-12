import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  TaskDomainType,
  TododlistDomainType,
  UpdateTaskDataType,
  UpdateTaskModelType,
  tasksAPI,
} from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/ErrorHandlers"
import { setIsLoadingAC } from "../appReducer/appReducer"
import { ThunkType } from "../store"
import {
  EntityStatusType,
  createTodolistAC,
  deleteTodolistAC,
  setTodolistsAC,
} from "../todolistReducer/todolistReducer"

const initialState = {} as TasksStateType

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setTasksAC(state, action: PayloadAction<{ todolistId: string; tasks: TaskDomainType[] }>) {
      return {
        ...state,
        [action.payload.todolistId]: action.payload.tasks.map((t) => ({
          ...t,
          entityStatus: "idle",
        })),
      }
    },
    createTaskAC(state, action: PayloadAction<{ todolistId: string; task: TaskDomainType }>) {
      return {
        ...state,
        [action.payload.todolistId]: [
          { ...action.payload.task, entityStatus: "idle" },
          ...state[action.payload.todolistId],
        ],
      }
    },
    deleteTaskAC(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      }
    },
    updateTaskAC(
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; data: UpdateTaskDataType }>
    ) {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, ...action.payload.data } : t
        ),
      }
    },
    setTaskStatusAC(
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: EntityStatusType }>
    ) {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, entityStatus: action.payload.entityStatus } : t
        ),
      }
    },
    createTasksForTodolistAC(state, action: PayloadAction<{ todolists: TododlistDomainType[] }>) {
      const tasksState: TasksStateType = { ...state }
      action.payload.todolists.forEach((tl) => {
        tasksState[tl.id] = []
      })
      return tasksState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTodolistsAC, (state, action) => {
      const tasksState: TasksStateType = { ...state }
      action.payload.todolists.forEach((tl) => {
        tasksState[tl.id] = []
      })
      return tasksState
    })
    builder.addCase(createTodolistAC, (state, action) => {
      return { ...state, [action.payload.todolist.id]: [] }
    })
    builder.addCase(deleteTodolistAC, (state, action) => {
      const stateCopy = { ...state }
      delete stateCopy[action.payload.todolistId]
      return stateCopy
    })
  },
})

export const tasksReducer = slice.reducer
export const {
  createTasksForTodolistAC,
  setTasksAC,
  createTaskAC,
  deleteTaskAC,
  updateTaskAC,
  setTaskStatusAC,
} = slice.actions

// thunks
export const fetchTasksTC =
  (todolistId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await tasksAPI.fetchTasks(todolistId)
      if (!response.data.error) {
        dispatch(setTasksAC({ todolistId, tasks: response.data.items }))
      } else {
        serverErrorHandler(dispatch, response.data.error)
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC({ isLoading: false }))
  }
export const createTaskTC =
  (todolistId: string, taskTitle: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await tasksAPI.createTask(todolistId, taskTitle)
      if (response.data.resultCode === 0) {
        dispatch(createTaskAC({ todolistId, task: response.data.data.item }))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC({ isLoading: false }))
  }
export const deleteTaskTC =
  (todolistId: string, taskId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "loading" }))
    try {
      const response = await tasksAPI.deleteTask(todolistId, taskId)
      if (response.data.resultCode === 0) {
        dispatch(deleteTaskAC({ todolistId, taskId }))
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "succeeded" }))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
    }
    dispatch(setIsLoadingAC({ isLoading: false }))
  }
export const updateTaskTC =
  (todolistId: string, taskId: string, dataModel: UpdateTaskModelType): ThunkType =>
  async (dispatch, getState) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "loading" }))
    try {
      const tasks = getState().tasks

      const task = tasks[todolistId].find((t) => t.id === taskId)!

      const data: UpdateTaskDataType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...dataModel,
      }

      const response = await tasksAPI.updateTask(todolistId, taskId, data)

      if (response.data.resultCode === 0) {
        dispatch(updateTaskAC({ todolistId, taskId, data }))
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "succeeded" }))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
    }
    dispatch(setIsLoadingAC({ isLoading: false }))
  }

// types
export type TaskEntityType = {
  entityStatus: EntityStatusType
} & TaskDomainType
export type TasksStateType = {
  [todolistId: string]: TaskEntityType[]
}
export type TasksReducerActionType =
  | ReturnType<typeof createTasksForTodolistAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof updateTaskAC>
  // | ReturnType<typeof deleteTasksTodolistAC>
  | ReturnType<typeof setTaskStatusAC>
