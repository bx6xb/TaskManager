const initialState = {} as AppStateType

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
export const setErrorAC = (error: string) =>
  ({
    type: "app/SET_ERROR",
    error,
  }) as const
export const setIsAppInitializedAC = (isAppInitialized: boolean) =>
  ({
    type: "app/SET_IS_APP_INITIALIZED",
    isAppInitialized,
  }) as const

// types
export type AppStateType = {
  isLoading: boolean
  error: string
  isAppInitialized: boolean
}
export type AppActionType =
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setIsAppInitializedAC>
