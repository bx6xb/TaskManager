import { setErrorAC } from "../../store/appReducer/appReducer"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Snackbar } from "./Snackbar"

export const SnackbarContainer = () => {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(setErrorAC(null))
  }

  return <Snackbar error={error} onClose={onClose} />
}
