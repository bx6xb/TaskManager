import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import {
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  updateTodolistTitleTC,
} from "../../store/todolistReducer/todolistReducer"
import { Navigate } from "react-router-dom"
import { Input } from "../../components/Input"
import { createTaskTC, deleteTaskTC, updateTaskTC } from "../../store/tasksReducer/tasksReducer"
import { TaskStatuses } from "../../api/api"
import { Todolist } from "./Todolist/Todolist"
import { Grid } from "@mui/material"

export const TodolistList = () => {
  const todolists = useAppSelector((state) => state.todolists)
  const tasks = useAppSelector((state) => state.tasks)
  const isAuthorized = useAppSelector((state) => state.login.isAuthorized)
  const dispatch = useAppDispatch()

  // fetch todolist on first init if authorized
  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchTodolistsTC())
    }
  }, [])

  // todolist callbacks
  const createTodolist = (todolistTitle: string) => {
    dispatch(createTodolistTC(todolistTitle))
  }
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistTC(todolistId))
  }
  const updateTodolistTitle = (todolistId: string, todolistTitle: string) => {
    dispatch(updateTodolistTitleTC(todolistId, todolistTitle))
  }

  // task callbacks
  const createTask = (todolistId: string, taskTitle: string) => {
    dispatch(createTaskTC(todolistId, taskTitle))
  }
  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskTC(todolistId, taskId))
  }
  const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(updateTaskTC(todolistId, taskId, { title }))
  }
  const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(todolistId, taskId, { status }))
  }

  // redirect
  if (!isAuthorized) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Input getItem={createTodolist} />

      <Grid container spacing={4} sx={{ marginTop: "10px" }} justifyContent={"center"}>
        {todolists.map((tl) => {
          let filteredTasks = tasks[tl.id]

          if (tl.filter === "active") {
            filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
          }
          if (tl.filter === "completed") {
            filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.Completed)
          }

          return (
            <Grid item md={4} lg={4} xl={3} key={tl.id}>
              <Todolist
                id={tl.id}
                title={tl.title}
                todolistStatus={tl.entityStatus}
                tasks={filteredTasks}
                deleteTodolist={deleteTodolist}
                updateTodolistTitle={updateTodolistTitle}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTaskTitle={updateTaskTitle}
                updateTaskStatus={updateTaskStatus}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
