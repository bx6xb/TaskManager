import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from "./layout/Header"
import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./store/store"
import { Preloader } from "./components/Preloader/Preloader"
import { TodolistList } from "./pages/TodolistList/TodolistList"
import { authTC, logoutTC } from "./store/loginReducer/loginReducer"
import s from "./App.module.css"
import { CircularProgress } from "@mui/material"
import { Snackbar } from "./components/Snackbar/Snackbar"
import { setErrorAC } from "./store/appReducer/appReducer"
import { Login } from "./pages/Login/Login"

function App() {
  const isAuthorized = useAppSelector((state) => state.login.isAuthorized)
  const appState = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authTC())
  }, [])

  // Header callback
  const logout = useCallback(() => {
    dispatch(logoutTC())
  }, [dispatch])

  // Snackbar callback
  const onSnackbarClose = useCallback(() => {
    dispatch(setErrorAC({ error: null }))
  }, [dispatch])

  if (!appState.isAppInitialized) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)" }}
      />
    )
  }

  return (
    <>
      <Header isAuthorized={isAuthorized} logout={logout} />
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
