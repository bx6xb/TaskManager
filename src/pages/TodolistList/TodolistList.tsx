import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../store/store"

export const TodolistList = () => {
  const isAuthorized = useAppSelector((state) => state.login.isAuthorized)

  if (!isAuthorized) {
    return <Navigate to={"/login"} />
  }

  return <div style={{ textAlign: "center" }}>Todolist List</div>
}
