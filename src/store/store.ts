import { combineReducers } from "redux"
import { todolistReducer } from "./todolistReducer/todolistReducer"
import { thunk } from "redux-thunk"
import { appReducer } from "./appReducer/appReducer"
import { tasksReducer } from "./tasksReducer/tasksReducer"
import { loginReducer } from "./loginReducer/loginReducer"
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

// types
export type AppRootStateType = ReturnType<typeof store.getState>
