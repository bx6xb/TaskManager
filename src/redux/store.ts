import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { TodolistReducerActionType } from "./todolistReducer/todolistReducer"
import { ThunkAction, ThunkDispatch, thunk } from "redux-thunk"
import { AppActionType } from "./appReducer/appReducer"

export const rootReducer = combineReducers({})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))

export const AppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionType = TodolistReducerActionType | AppActionType
export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AppRootActionType>
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppRootActionType>
