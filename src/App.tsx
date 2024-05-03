import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from "./layout/Header"
import { Login } from "./pages/Login/Login"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./store/store"
import { Preloader } from "./components/Preloader"
import { TodolistList } from "./pages/TodolistList/TodolistList"
import { authTC } from "./store/loginReducer/loginReducer"
import s from "./App.module.css"
import { Snackbar } from "./components/Snackbar"

function App() {
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authTC())
  }, [])

  return (
    <>
      <Header />
      {isLoading && <Preloader />}
      {isAppInitialized && (
        <div className={s.appContainer}>
          <Routes>
            <Route path="/" element={<Navigate to={"/todolist-list"} />} />

            <Route path="/todolist-list" element={<TodolistList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}
      <Snackbar />
    </>
  )
}

export default App
