import { memo, useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import {
  FilterType,
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  updateTodolistFilterAC,
  updateTodolistTitleTC,
} from "../../store/todolistReducer/todolistReducer"
import { Navigate } from "react-router-dom"
import { Input } from "../../components/Input/Input"
import { createTaskTC, deleteTaskTC, updateTaskTC } from "../../store/tasksReducer/tasksReducer"
import { TaskStatuses } from "../../api/api"
import { Todolist } from "./Todolist/Todolist"
import { Grid } from "@mui/material"

export const TodolistList = memo(() => {
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
  const createTodolist = useCallback(
    (todolistTitle: string) => {
      dispatch(createTodolistTC(todolistTitle))
    },
    [dispatch]
  )
  const deleteTodolist = useCallback(
    (todolistId: string) => {
      dispatch(deleteTodolistTC(todolistId))
    },
    [dispatch]
  )
  const updateTodolistTitle = useCallback(
    (todolistId: string, todolistTitle: string) => {
      dispatch(updateTodolistTitleTC(todolistId, todolistTitle))
    },
    [dispatch]
  )
  const updateTodolistFilter = useCallback(
    (todolistId: string, filter: FilterType) => {
      dispatch(updateTodolistFilterAC({ filter: filter, todolistId }))
    },
    [dispatch]
  )

  // task callbacks
  const createTask = useCallback(
    (todolistId: string, taskTitle: string) => {
      dispatch(createTaskTC(todolistId, taskTitle))
    },
    [dispatch]
  )
  const deleteTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(deleteTaskTC(todolistId, taskId))
    },
    [dispatch]
  )
  const updateTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { title }))
    },
    [dispatch]
  )
  const updateTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todolistId, taskId, { status }))
    },
    [dispatch]
  )

  // redirect
  if (!isAuthorized) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Input getItem={createTodolist} label="Add todolist" />

      <Grid container spacing={4} sx={{ marginTop: "10px" }}>
        {todolists.map((tl) => {
          let filteredTasks = tasks[tl.id]

          if (tl.filter === "active") {
            filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
          }
          if (tl.filter === "completed") {
            filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.Completed)
          }

          return (
            <Grid item key={tl.id}>
              <Todolist
                id={tl.id}
                title={tl.title}
                todolistStatus={tl.entityStatus}
                filter={tl.filter}
                tasks={filteredTasks}
                deleteTodolist={deleteTodolist}
                updateTodolistTitle={updateTodolistTitle}
                updateTodolistFilter={updateTodolistFilter}
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
})
