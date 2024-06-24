import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { logout } from "../loginReducer/loginReducer"
import { todolistActions } from "../todolistReducer"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { setIsLoading } from "../appReducer/appReducer"
import { tasksAPI } from "../../api/api"
import { errorHandler } from "../../utils/errorHandler"
import { AppRootStateType } from "../store"
import { TaskDomainType, UpdateTaskDataType, UpdateTaskModelType } from "../../api/types"
import { EntityStatusType } from "../todolistReducer/types"
import { TasksStateType } from "./types"

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading({ isLoading: true }))
    try {
      const response = await tasksAPI.fetchTasks(todolistId)
      if (!response.data.error) {
        return { todolistId, tasks: response.data.items }
      } else {
        errorHandler(dispatch, response.data.error)
        return rejectWithValue(response.data.error)
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
export const createTask = createAsyncThunk<
  { todolistId: string; task: TaskDomainType },
  { todolistId: string; taskTitle: string },
  { rejectValue: string }
>("tasks/createTask", async ({ todolistId, taskTitle }, { dispatch, rejectWithValue }) => {
  dispatch(setIsLoading({ isLoading: true }))
  try {
    const response = await tasksAPI.createTask(todolistId, taskTitle)
    if (response.data.resultCode === 0) {
      return { todolistId, task: response.data.data.item }
    } else {
      return rejectWithValue(response.data.messages[0])
    }
  } catch (err: any) {
    const error = err as Error
    errorHandler(dispatch, error.message)
    return rejectWithValue(error.message)
  } finally {
    dispatch(setIsLoading({ isLoading: false }))
  }
})
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (
    { todolistId, taskId }: { todolistId: string; taskId: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setIsLoading({ isLoading: true }))
    dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "loading" }))
    try {
      const response = await tasksAPI.deleteTask(todolistId, taskId)
      if (response.data.resultCode === 0) {
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "succeeded" }))
        return { todolistId, taskId }
      } else {
        errorHandler(dispatch, response.data.messages[0])
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
        return rejectWithValue(response.data.messages[0])
      }
    } catch (err: any) {
      const error = err as Error
      errorHandler(dispatch, error.message)
      dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
      return rejectWithValue(error.message)
    } finally {
      dispatch(setIsLoading({ isLoading: false }))
    }
  },
)
export const updateTask = createAsyncThunk<
  { todolistId: string; taskId: string; data: UpdateTaskDataType },
  { todolistId: string; taskId: string; dataModel: UpdateTaskModelType },
  { state: AppRootStateType }
>(
  "tasks/updateTask",
  async ({ todolistId, taskId, dataModel }, { dispatch, rejectWithValue, getState }) => {
    dispatch(setIsLoading({ isLoading: true }))
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
        errorHandler(dispatch, response.data.messages[0])
        dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
        return rejectWithValue(response.data.messages[0])
      }
    } catch (err: any) {
      const error = err as Error
      errorHandler(dispatch, error.message)
      dispatch(setTaskStatusAC({ todolistId, taskId, entityStatus: "canceled" }))
      return rejectWithValue(error.message)
    } finally {
      dispatch(setIsLoading({ isLoading: false }))
    }
  },
)

export const asyncActions = { fetchTasks, createTask, deleteTask, updateTask }

export const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    setTaskStatusAC(
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: EntityStatusType }>,
    ) {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, entityStatus: action.payload.entityStatus } : t,
        ),
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistActions.fetchTodolists.fulfilled, (state, action) => {
        const tasksState: TasksStateType = { ...state }
        action.payload.todolists.forEach((tl) => {
          tasksState[tl.id] = []
        })
        return tasksState
      })
      .addCase(todolistActions.createTodolist.fulfilled, (state, action) => {
        return { ...state, [action.payload.todolist.id]: [] }
      })
      .addCase(todolistActions.deleteTodolist.fulfilled, (state, action) => {
        const stateCopy = { ...state }
        delete stateCopy[action.payload.todolistId]
        return stateCopy
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.todolistId]: action.payload.tasks.map((t) => ({
            ...t,
            entityStatus: "idle",
          })),
        }
      })
      .addCase(createTask.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.todolistId]: [
            { ...action.payload.task, entityStatus: "idle" },
            ...state[action.payload.todolistId],
          ],
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.todolistId]: state[action.payload.todolistId].filter(
            (t) => t.id !== action.payload.taskId,
          ),
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
            t.id === action.payload.taskId ? { ...t, ...action.payload.data } : t,
          ),
        }
      })
      .addCase(logout.fulfilled, () => ({})) // clears state
  },
})

export const tasksReducer = slice.reducer
export const { setTaskStatusAC } = slice.actions
