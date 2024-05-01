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

// types
export type AppStateType = {
  isLoading: boolean
  error: string
}
export type AppActionType = ReturnType<typeof setIsLoadingAC> | ReturnType<typeof setErrorAC>
