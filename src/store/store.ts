import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { combineReducers } from "redux"
import { TodolistReducerActionType, todolistReducer } from "./todolistReducer/todolistReducer"
import { thunk } from "redux-thunk"
import { AppActionType, appReducer } from "./appReducer/appReducer"
import { TasksReducerActionType, tasksReducer } from "./tasksReducer/tasksReducer"
import { LoginReducerActionType, loginReducer } from "./loginReducer/loginReducer"
import { configureStore } from "@reduxjs/toolkit"

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

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<DispatchType>()

// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionType =
  | TodolistReducerActionType
  | AppActionType
  | TasksReducerActionType
  | LoginReducerActionType
export type DispatchType = typeof store.dispatch
