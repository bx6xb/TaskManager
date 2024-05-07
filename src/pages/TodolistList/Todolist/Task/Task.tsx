import { ChangeEvent } from "react"
import { TaskStatuses } from "../../../../api/api"
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan"
import { Checkbox } from "@mui/material"
import { DeleteButton } from "../../../../components/DeleteButton/DeleteButton"
import { EntityStatusType } from "../../../../store/todolistReducer/todolistReducer"

type TaskPropsType = {
  id: string
  title: string
  taskStatus: TaskStatuses
  taskEntityStatus: EntityStatusType
  todolistId: string
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
  const updateTaskTitle = (title: string) => {
    if (title !== props.title) {
      props.updateTaskTitle(props.todolistId, props.id, title)
    }
  }
  const deleteTaskOnClick = () => {
    props.deleteTask(props.todolistId, props.id)
  }

  const isDisabled = props.taskEntityStatus === "loading"

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        checked={props.taskStatus === TaskStatuses.Completed}
        onChange={taskStatusOnChange}
        disabled={isDisabled}
        sx={{ padding: "0", marginRight: "5px" }}
      />
      <EditableSpan title={props.title} changeItem={updateTaskTitle} />
      <DeleteButton onClick={deleteTaskOnClick} isDisabled={isDisabled} />
    </div>
  )
}
