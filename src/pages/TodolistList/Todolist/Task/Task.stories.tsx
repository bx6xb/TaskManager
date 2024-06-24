import { useState } from "react"
import { Task } from "./Task"
import { TaskStatuses } from "../../../../api/types"

export default {
  title: "Task",
  component: Task,
}

export const TaskBaseExample = () => {
  const [taskStatus, setTaskStatus] = useState<TaskStatuses>(TaskStatuses.Completed)
  const [title, setTitle] = useState<string>("Task title")

  return (
    <Task
      todolistId="todolistId"
      id="taskId"
      title={title}
      taskEntityStatus="idle"
      taskStatus={taskStatus}
    />
  )
}
export const LoadingTaskExample = () => {
  const [taskStatus, setTaskStatus] = useState<TaskStatuses>(TaskStatuses.New)
  const [title, setTitle] = useState<string>("Task title")

  return (
    <Task
      todolistId="todolistId"
      id="taskId"
      title={title}
      taskEntityStatus="loading"
      taskStatus={taskStatus}
    />
  )
}
