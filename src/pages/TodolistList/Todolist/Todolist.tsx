import { useEffect } from "react"
import { Input } from "../../../components/Input"
import { useAppDispatch } from "../../../store/store"
import { fetchTasksTC } from "../../../store/tasksReducer/tasksReducer"
import { TaskDomainType, TaskStatuses } from "../../../api/api"
import { Task } from "./Task/Task"

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

  return (
    <div
      style={{
        border: "2px solid black",
        width: "250px",
        borderRadius: "3px",
        padding: "5px",
        margin: "15px 15px 0 0",
      }}
    >
      {props.title + " "}
      <button onClick={deleteTodolist}>x</button>
      <Input getItem={createTask} />
      {props.tasks &&
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
        ))}
    </div>
  )
}
