import SnackbarUI from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useAppDispatch, useAppSelector } from "../store/store"
import { setErrorAC } from "../store/appReducer/appReducer"

export const Snackbar = () => {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()

  const isOpen = error !== null

  const handleClose = () => {
    dispatch(setErrorAC(null))
  }

  return (
    <SnackbarUI open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </SnackbarUI>
  )
}
