import { useMemo } from "react"
import { TypedUseSelectorHook } from "react-redux"
import { ActionCreatorsMapObject, bindActionCreators } from "redux"
import { AppRootStateType } from "../store/store"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useDispatch()

  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [])

  return boundActions
} // takes object of action creators and returns object of action creators which doesn't need to dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
