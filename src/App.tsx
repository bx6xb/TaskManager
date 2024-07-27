import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from "./layout/Header/Header"
import { useCallback, useEffect } from "react"
import { Loading } from "./components/Loading/Loading"
import { TodolistList } from "./pages/TodolistList/TodolistList"
import s from "./App.module.css"
import { CircularProgress } from "@mui/material"
import { Snackbar } from "./components/Snackbar/Snackbar"
import { Login } from "./pages/Login/Login"
import { selectIsAuthorized } from "./store/loginReducer/selectors"
import { appActions, appSelectors } from "./store/appReducer"
import { loginActions } from "./store/loginReducer"
import { useActions, useAppSelector } from "./utils/reduxUtils"

function App() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const { isAppInitialized, error, isLoading } = useAppSelector(appSelectors.selectAppState)
  const { logout, auth } = useActions(loginActions)
  const { setError } = useActions(appActions)

  useEffect(() => {
    auth()
  }, [])

  // Header callback
  const logoutCallback = useCallback(() => {
    logout()
  }, [])

  // Snackbar callback
  const onSnackbarClose = useCallback(() => {
    setError({ error: null })
  }, [])

  if (!isAppInitialized) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    )
  }

  return (
    <>
      <Header isAuthorized={isAuthorized} logout={logoutCallback} />
      {isLoading && <Loading />}
      {isAppInitialized && (
        <div className={s.appContainer}>
          <Routes>
            <Route path="/" element={<Navigate to={"/todolists-list"} />} />

            <Route path="/todolists-list" element={<TodolistList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}
      <Snackbar error={error} onClose={onSnackbarClose} />
    </>
  )
}

export default App
