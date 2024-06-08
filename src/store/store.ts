import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { ActionCreatorsMapObject, bindActionCreators, combineReducers } from "redux"
import { todolistReducer } from "./todolistReducer/todolistReducer"
import { thunk } from "redux-thunk"
import { appReducer } from "./appReducer/appReducer"
import { tasksReducer } from "./tasksReducer/tasksReducer"
import { loginReducer } from "./loginReducer/loginReducer"
import { configureStore } from "@reduxjs/toolkit"
import { useMemo } from "react"

export const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  todolists: todolistReducer,
  tasks: tasksReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  devTools: process.env.NODE_ENV !== "production",
})

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useAppDispatch()

  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [])

  return boundActions
} // takes object of action creators and returns object of action creators which doesn't need to dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<DispatchType>()

// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
