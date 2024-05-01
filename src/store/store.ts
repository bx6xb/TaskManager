import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { TodolistReducerActionType, todolistReducer } from "./todolistReducer/todolistReducer"
import { ThunkAction, ThunkDispatch, thunk } from "redux-thunk"
import { AppActionType, appReducer } from "./appReducer/appReducer"
import { TasksReducerActionType, tasksReducer } from "./tasksReducer/tasksReducer"

export const rootReducer = combineReducers({
  app: appReducer,
  todolist: todolistReducer,
  tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))

export const AppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionType = TodolistReducerActionType | AppActionType | TasksReducerActionType
export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AppRootActionType>
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppRootActionType>
