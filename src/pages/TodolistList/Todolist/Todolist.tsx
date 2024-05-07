import { useEffect } from "react"
import { Input } from "../../../components/Input/Input"
import { useAppDispatch } from "../../../store/store"
import { TaskEntityType, fetchTasksTC } from "../../../store/tasksReducer/tasksReducer"
import { TaskStatuses } from "../../../api/api"
import { Task } from "./Task/Task"
import { Button, Paper } from "@mui/material"
import { DeleteButton } from "../../../components/DeleteButton/DeleteButton"
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan"
import { EntityStatusType, FilterType } from "../../../store/todolistReducer/todolistReducer"

type TodolistPropsType = {
  id: string
  title: string
  todolistStatus: EntityStatusType
  filter: FilterType
  tasks: TaskEntityType[]
  deleteTodolist: (todolistId: string) => void
  updateTodolistTitle: (todolistId: string, todolistTitle: string) => void
  updateTodolistFilter: (todolistId: string, filter: FilterType) => void
  createTask: (todolistId: string, taskTitle: string) => void
  deleteTask: (todolistId: string, taskId: string) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
  updateTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  demo?: boolean
}

export const Todolist = (props: TodolistPropsType) => {
  const dispatch = useAppDispatch()

  // fetch tasks for todolist on first init
  useEffect(() => {
    if (!props.demo) {
      dispatch(fetchTasksTC(props.id))
    }
  }, [])

  // todolist callbacks
  const deleteTodolist = () => {
    props.deleteTodolist(props.id)
  }
  const updateTodolistTitle = (title: string) => {
    if (title !== props.title) {
      props.updateTodolistTitle(props.id, title)
    }
  }
  const updateTodolistFilter = (filter: FilterType) => {
    props.updateTodolistFilter(props.id, filter)
  }

  // tasks callbacks
  const createTask = (taskTitle: string) => {
    props.createTask(props.id, taskTitle)
  }

  const isDisabled = props.todolistStatus === "loading"

  const buttonStyledHandler = (filter: FilterType) =>
    props.filter === filter ? "contained" : "outlined"

  return (
    <Paper elevation={8} sx={{ padding: "20px" }}>
      <h3 style={{ wordWrap: "break-word" }}>
        <EditableSpan changeItem={updateTodolistTitle} title={props.title} />
        <DeleteButton onClick={deleteTodolist} isDisabled={isDisabled} />
      </h3>

      <div style={{ marginBottom: "10px" }}>
        <Input getItem={createTask} isStretched label="Add task" />
      </div>

      {props.tasks.length ? (
        props.tasks.map((t) => (
          <Task
            key={t.id}
            id={t.id}
            title={t.title}
            taskStatus={t.status}
            taskEntityStatus={t.entityStatus}
            todolistId={props.id}
            deleteTask={props.deleteTask}
            updateTaskTitle={props.updateTaskTitle}
            updateTaskStatus={props.updateTaskStatus}
          />
        ))
      ) : (
        <h3>No tasks...</h3>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Button
          variant={buttonStyledHandler("all")}
          color="primary"
          onClick={() => updateTodolistFilter("all")}
        >
          All
        </Button>
        <Button
          variant={buttonStyledHandler("completed")}
          color="secondary"
          onClick={() => updateTodolistFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={buttonStyledHandler("active")}
          color="warning"
          onClick={() => updateTodolistFilter("active")}
        >
          Active
        </Button>
      </div>
    </Paper>
  )
}
