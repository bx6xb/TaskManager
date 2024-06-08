import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from "./layout/Header"
import { useCallback, useEffect } from "react"
import { useActions, useAppSelector } from "./store/store"
import { Preloader } from "./components/Preloader/Preloader"
import { TodolistList } from "./pages/TodolistList/TodolistList"
import s from "./App.module.css"
import { CircularProgress } from "@mui/material"
import { Snackbar } from "./components/Snackbar/Snackbar"
import { Login } from "./pages/Login/Login"
import { selectIsAuthorized } from "./store/loginReducer/selectors"
import { appActions, appSelectors } from "./store/appReducer"
import { loginActions } from "./store/loginReducer"

function App() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const appState = useAppSelector(appSelectors.selectAppState)
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

  if (!appState.isAppInitialized) {
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
      {appState.isLoading && <Preloader />}
      {appState.isAppInitialized && (
        <div className={s.appContainer}>
          <Routes>
            <Route path="/" element={<Navigate to={"/todolists-list"} />} />

            <Route path="/todolists-list" element={<TodolistList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}
      <Snackbar error={appState.error} onClose={onSnackbarClose} />
    </>
  )
}

export default App
