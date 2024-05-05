const initialState: AppStateType = {
  error: null,
  isAppInitialized: false,
  isLoading: false,
}

export const appReducer = (
  state: AppStateType = initialState,
  action: AppActionType
): AppStateType => {
  switch (action.type) {
    case "app/SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case "app/SET_ERROR":
      return {
        ...state,
        error: action.error,
      }
    case "app/SET_IS_APP_INITIALIZED":
      return {
        ...state,
        isAppInitialized: action.isAppInitialized,
      }
    default:
      return state
  }
}

// actions
export const setIsLoadingAC = (isLoading: boolean) =>
  ({
    type: "app/SET_IS_LOADING",
    isLoading,
  }) as const
export const setErrorAC = (error: string | null) =>
  ({
    type: "app/SET_ERROR",
    error,
  }) as const
export const setIsAppInitializedAC = (isAppInitialized: boolean) =>
  ({
    type: "app/SET_IS_APP_INITIALIZED",
    isAppInitialized,
  }) as const
export const setTodolistsDisabledAC = (todolistId: string, isDisabled: boolean) =>
  ({
    type: "app/SET_TODOLISTS_DISABLED",
    todolistId,
    isDisabled,
  }) as const
export const setTasksDisabledAC = (taskId: string, isDisabled: boolean) =>
  ({
    type: "app/SET_TASKS_DISABLED",
    taskId,
    isDisabled,
  }) as const

// types
export type AppStateType = {
  isLoading: boolean
  error: string | null
  isAppInitialized: boolean
}
export type AppActionType =
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setIsAppInitializedAC>
  | ReturnType<typeof setTodolistsDisabledAC>
  | ReturnType<typeof setTasksDisabledAC>
