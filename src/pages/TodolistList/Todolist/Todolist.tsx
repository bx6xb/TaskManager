import { useEffect } from "react"
import { Input } from "../../../components/Input"
import { useAppDispatch } from "../../../store/store"
import { fetchTasksTC } from "../../../store/tasksReducer/tasksReducer"
import { TaskDomainType, TaskStatuses } from "../../../api/api"
import { Task } from "./Task/Task"
import { Paper } from "@mui/material"
import { DeleteButton } from "../../../components/DeleteButton"
import { EditableSpan } from "../../../components/EditableSpan"

type TodolistPropsType = {
  id: string
  title: string
  tasks: TaskDomainType[]
  deleteTodolist: (todolistId: string) => void
  updateTodolistTitle: (todolistId: string, todolistTitle: string) => void
  createTask: (todolistId: string, taskTitle: string) => void
  deleteTask: (todolistId: string, taskId: string) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
  updateTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
}

export const Todolist = (props: TodolistPropsType) => {
  const dispatch = useAppDispatch()

  // fetch tasks for todolist on first init
  useEffect(() => {
    dispatch(fetchTasksTC(props.id))
  }, [])

  const createTask = (taskTitle: string) => {
    props.createTask(props.id, taskTitle)
  }
  const deleteTodolist = () => {
    props.deleteTodolist(props.id)
  }
  const updateTodolistTitle = (title: string) => {
    props.updateTodolistTitle(props.id, title)
  }

  return (
    <Paper elevation={8} sx={{ padding: "10px" }}>
      <h3 style={{ wordWrap: "break-word" }}>
        <EditableSpan changeItem={updateTodolistTitle} title={props.title} />
        <DeleteButton onClick={deleteTodolist} />
      </h3>

      <Input getItem={createTask} />
      {props.tasks.length ? (
        props.tasks.map((t) => (
          <Task
            key={t.id}
            id={t.id}
            title={t.title}
            todolistId={props.id}
            taskStatus={t.status}
            deleteTask={props.deleteTask}
            updateTaskTitle={props.updateTaskTitle}
            updateTaskStatus={props.updateTaskStatus}
          />
        ))
      ) : (
        <h3>No tasks...</h3>
      )}
    </Paper>
  )
}
