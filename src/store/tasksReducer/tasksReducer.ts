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

const initialState = {} as TasksStateType

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksReducerActionType
): TasksStateType => {
  switch (action.type) {
    case "tasks/CREATE_TASKS_FOR_TODOLIST":
      const tasksState: TasksStateType = {}
      action.todolists.forEach((tl) => {
        tasksState[tl.id] = []
      })
      return tasksState
    case "tasks/SET_TASKS":
      return {
        ...state,
        [action.todolistId]: action.tasks,
      }
    case "tasks/CREATE_TASK":
      return {
        ...state,
        [action.todolistId]: [action.task, ...state[action.todolistId]],
      }
    case "tasks/DELETE_TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
      }
    case "tasks/UPDATE_TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.data } : t
        ),
      }
    case "tasks/DELETE_TASKS_TODOLIST":
      const stateCopy = { ...state }
      delete stateCopy[action.todolistId]
      return stateCopy
    default:
      return state
  }
}

// actions
export const createTasksForTodolistAC = (todolists: TododlistDomainType[]) =>
  ({
    type: "tasks/CREATE_TASKS_FOR_TODOLIST",
    todolists,
  }) as const
export const setTasksAC = (todolistId: string, tasks: TaskDomainType[]) =>
  ({
    type: "tasks/SET_TASKS",
    todolistId,
    tasks,
  }) as const
export const createTaskAC = (todolistId: string, task: TaskDomainType) =>
  ({
    type: "tasks/CREATE_TASK",
    todolistId,
    task,
  }) as const
export const deleteTaskAC = (todolistId: string, taskId: string) =>
  ({
    type: "tasks/DELETE_TASK",
    todolistId,
    taskId,
  }) as const
export const updateTaskAC = (todolistId: string, taskId: string, data: UpdateTaskDataType) =>
  ({
    type: "tasks/UPDATE_TASK",
    todolistId,
    taskId,
    data,
  }) as const
export const deleteTasksTodolistAC = (todolistId: string) =>
  ({
    type: "tasks/DELETE_TASKS_TODOLIST",
    todolistId,
  }) as const

// thunks
export const fetchTasksTC =
  (todolistId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
      const response = await tasksAPI.fetchTasks(todolistId)
      if (!response.data.error) {
        dispatch(setTasksAC(todolistId, response.data.items))
      } else {
        serverErrorHandler(dispatch, response.data.error)
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }
export const createTaskTC =
  (todolistId: string, taskTitle: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
      const response = await tasksAPI.createTask(todolistId, taskTitle)
      if (response.data.resultCode === 0) {
        dispatch(createTaskAC(todolistId, response.data.data.item))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }
export const deleteTaskTC =
  (todolistId: string, taskId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
      const response = await tasksAPI.deleteTask(todolistId, taskId)
      if (response.data.resultCode === 0) {
        dispatch(deleteTaskAC(todolistId, taskId))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }
export const updateTaskTC =
  (todolistId: string, taskId: string, dataModel: UpdateTaskModelType): ThunkType =>
  async (dispatch, getState) => {
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

    dispatch(setIsLoadingAC(true))
    try {
      const response = await tasksAPI.updateTask(todolistId, taskId, data)
      if (response.data.resultCode === 0) {
        dispatch(updateTaskAC(todolistId, taskId, data))
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
    }
    dispatch(setIsLoadingAC(false))
  }

// types
export type TasksStateType = {
  [todolistId: string]: TaskDomainType[]
}
export type TasksReducerActionType =
  | ReturnType<typeof createTasksForTodolistAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof deleteTasksTodolistAC>
