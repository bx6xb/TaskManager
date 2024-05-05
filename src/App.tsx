import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from "./layout/Header"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./store/store"
import { Preloader } from "./components/Preloader/Preloader"
import { TodolistList } from "./pages/TodolistList/TodolistList"
import { authTC } from "./store/loginReducer/loginReducer"
import s from "./App.module.css"
import { CircularProgress } from "@mui/material"
import { SnackbarContainer } from "./components/Snackbar/SnackbarContainer"
import { LoginContainer } from "./pages/Login/LoginContainer"

function App() {
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authTC())
  }, [])

  if (!isAppInitialized) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)" }}
      />
    )
  }

  return (
    <>
      <Header />
      {isLoading && <Preloader />}
      {isAppInitialized && (
        <div className={s.appContainer}>
          <Routes>
            <Route path="/" element={<Navigate to={"/todolist-list"} />} />

            <Route path="/todolist-list" element={<TodolistList />} />
            <Route path="/login" element={<LoginContainer />} />
          </Routes>
        </div>
      )}
      <SnackbarContainer />
    </>
  )
}

export default App
