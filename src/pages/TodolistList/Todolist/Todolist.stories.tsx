import { useState } from "react"
import { action } from "@storybook/addon-actions"
import { Todolist } from "./Todolist"
import { TaskEntityType } from "../../../store/tasksReducer/tasksReducer"

export default {
  title: "Todolist",
  component: Todolist,
}

const callback = (text: string) => action(text)

export const TodolistBaseExample = () => {
  const [todolistTitle, setTodolistTitle] = useState<string>("Todolist title")

  // todolist callbacks
  const updateTodolistTitle = (todolistId: string, todolistTitle: string) => {
    callback("Todolist title was updated")()
    setTodolistTitle(todolistTitle)
  }
  const deleteTodolist = () => {
    callback("Todolist was deleted")()
  }

  // tasks callbacks
  const createTask = () => {
    callback("Task was created")()
  }
  const deleteTask = () => {
    callback("Task was deleted")()
  }
  const updateTaskStatus = () => {
    callback("Task status was updated")()
  }
  const updateTaskTitle = () => {
    callback("Task title was updated")()
  }

  return (
    <Todolist
      createTask={createTask}
      deleteTask={deleteTask}
      deleteTodolist={deleteTodolist}
      id="todolistId1"
      demo
      title={todolistTitle}
      updateTodolistTitle={updateTodolistTitle}
      todolistStatus="idle"
      updateTaskStatus={updateTaskStatus}
      updateTaskTitle={updateTaskTitle}
      tasks={[] as TaskEntityType[]}
    />
  )
}
