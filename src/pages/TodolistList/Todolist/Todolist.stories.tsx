import { useState } from "react"
import { Todolist } from "./Todolist"
import { TaskEntityType } from "../../../store/tasksReducer/types"

export default {
  title: "Todolist",
  component: Todolist,
}

export const TodolistBaseExample = () => {
  const [todolistTitle, setTodolistTitle] = useState<string>("Todolist title")

  return (
    <Todolist
      id="todolistId1"
      demo
      title={todolistTitle}
      todolistStatus="idle"
      tasks={[] as TaskEntityType[]}
      filter="all"
    />
  )
}
