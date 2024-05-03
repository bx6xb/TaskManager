import { ChangeEvent } from "react"
import { TaskStatuses } from "../../../../api/api"
import { EditableSpan } from "../../../../components/EditableSpan"
import { Checkbox } from "@mui/material"
import { DeleteButton } from "../../../../components/DeleteButton"

type TaskPropsType = {
  id: string
  title: string
  todolistId: string
  taskStatus: TaskStatuses
  deleteTask: (todolistId: string, taskId: string) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
  updateTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
}

export const Task = (props: TaskPropsType) => {
  const taskStatusOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.updateTaskStatus(
      props.todolistId,
      props.id,
      e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    )
  }
  const changeTaskTitle = (title: string) => {
    props.updateTaskTitle(props.todolistId, props.id, title)
  }
  const deleteTaskOnClick = () => {
    props.deleteTask(props.todolistId, props.id)
  }

  return (
    <div>
      <Checkbox
        checked={props.taskStatus === TaskStatuses.Completed}
        onChange={taskStatusOnChange}
      />
      <EditableSpan title={props.title} changeItem={changeTaskTitle} />
      <DeleteButton onClick={deleteTaskOnClick} />
    </div>
  )
}
