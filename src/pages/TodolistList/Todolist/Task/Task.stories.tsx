import { useState } from "react"
import { action } from "@storybook/addon-actions"
import { Task } from "./Task"
import { TaskStatuses } from "../../../../api/api"

export default {
  title: "Task",
  component: Task,
}

const callback = (text: string) => action(text)

export const TaskBaseExample = () => {
  const [taskStatus, setTaskStatus] = useState<TaskStatuses>(TaskStatuses.Completed)
  const [title, setTitle] = useState<string>("Task title")

  const deleteTask = () => {
    callback("task deleted")()
  }
  const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    setTaskStatus(status)
    callback("task status was updated")()
  }
  const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTitle(title)
    callback("task title was updated")()
  }

  return (
    <Task
      deleteTask={deleteTask}
      updateTaskStatus={updateTaskStatus}
      updateTaskTitle={updateTaskTitle}
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

  const deleteTask = () => {
    callback("task deleted")()
  }
  const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    setTaskStatus(status)
    callback("task status was updated")()
  }
  const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTitle(title)
    callback("task title was updated")()
  }

  return (
    <Task
      deleteTask={deleteTask}
      updateTaskStatus={updateTaskStatus}
      updateTaskTitle={updateTaskTitle}
      todolistId="todolistId"
      id="taskId"
      title={title}
      taskEntityStatus="loading"
      taskStatus={taskStatus}
    />
  )
}
