import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TaskDomainType, UpdateTaskDataType, UpdateTaskModelType, tasksAPI } from "../../api/api"
import { networkErrorHandler, serverErrorHandler } from "../../utils/errorHandlers"
import { setIsLoadingAC } from "../appReducer/appReducer"
import {
  EntityStatusType,
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
} from "../todolistReducer/todolistReducer"
import { AppRootStateType } from "../store"
import { logoutTC } from "../loginReducer/loginReducer"

// thunks
export const fetchTasksTC = createAsyncThunk(
  "tasks/fetchTasks",
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await tasksAPI.fetchTasks(todolistId)
      if (!response.data.error) {
        return { todolistId, tasks: response.data.items }
      } else {
        serverErrorHandler(dispatch, response.data.error)
        return rejectWithValue(response.data.error)
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }))
    }
  }
)
export const createTaskTC = createAsyncThunk(
  "tasks/createTask",
  async (
    { todolistId, taskTitle }: { todolistId: string; taskTitle: string },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    try {
      const response = await tasksAPI.createTask(todolistId, taskTitle)
      if (response.data.resultCode === 0) {
        return { todolistId, task: response.data.data.item }
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
export const deleteTaskTC = createAsyncThunk(
  "tasks/deleteTask",
  async (
    { todolistId, taskId }: { todolistId: string; taskId: string },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "loading" }))
    try {
      const response = await tasksAPI.deleteTask(todolistId, taskId)
      if (response.data.resultCode === 0) {
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "succeeded" }))
        return { todolistId, taskId }
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
        return rejectWithValue(response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }))
    }
  }
)
export const updateTaskTC = createAsyncThunk<
  { todolistId: string; taskId: string; data: UpdateTaskDataType },
  { todolistId: string; taskId: string; dataModel: UpdateTaskModelType },
  { state: AppRootStateType }
>(
  "tasks/updateTask",
  async ({ todolistId, taskId, dataModel }, { dispatch, rejectWithValue, getState }) => {
    dispatch(setIsLoadingAC({ isLoading: true }))
    dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "loading" }))
    try {
      const task = getState().tasks[todolistId].find((t) => t.id === taskId)!

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
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "succeeded" }))
        return { todolistId, taskId, data }
      } else {
        serverErrorHandler(dispatch, response.data.messages[0])
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
        return rejectWithValue(response.data.messages[0])
      }
    } catch (e: any) {
      networkErrorHandler(dispatch, e.message)
      dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
      return rejectWithValue(e.message)
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }))
    }
  }
)

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        const tasksState: TasksStateType = { ...state }
        action.payload.todolists.forEach((tl) => {
          tasksState[tl.id] = []
        })
        return tasksState
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        return { ...state, [action.payload.todolist.id]: [] }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const stateCopy = { ...state }
        delete stateCopy[action.payload.todolistId]
        return stateCopy
      })
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.todolistId]: action.payload.tasks.map((t) => ({
            ...t,
            entityStatus: "idle",
          })),
        }
      })
      .addCase(createTaskTC.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.todolistId]: [
            { ...action.payload.task, entityStatus: "idle" },
            ...state[action.payload.todolistId],
          ],
        }
      })
      .addCase(deleteTaskTC.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.todolistId]: state[action.payload.todolistId].filter(
            (t) => t.id !== action.payload.taskId
          ),
        }
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
            t.id === action.payload.taskId ? { ...t, ...action.payload.data } : t
          ),
        }
      })
      .addCase(logoutTC.fulfilled, () => ({})) // clears state
  },
})

export const tasksReducer = slice.reducer
export const { setTaskStatusAC } = slice.actions

// types
export type TaskEntityType = {
  entityStatus: EntityStatusType
} & TaskDomainType
export type TasksStateType = {
  [todolistId: string]: TaskEntityType[]
}
export type TasksReducerActionType = ReturnType<typeof setTaskStatusAC>
