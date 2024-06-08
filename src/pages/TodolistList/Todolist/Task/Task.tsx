import { ChangeEvent, memo, useCallback } from "react"
import { TaskStatuses } from "../../../../api/api"
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan"
import { Checkbox } from "@mui/material"
import { DeleteButton } from "../../../../components/DeleteButton/DeleteButton"
import { EntityStatusType } from "../../../../store/todolistReducer/todolistReducer"
import { useActions } from "../../../../store/store"
import { tasksActions } from "../../../../store/tasksReducer"
import s from "./Task.module.css"

type TaskPropsType = {
  id: string
  title: string
  taskStatus: TaskStatuses
  taskEntityStatus: EntityStatusType
  todolistId: string
}

export const Task = memo((props: TaskPropsType) => {
  const { deleteTask, updateTask } = useActions(tasksActions)

  const taskStatusOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
      updateTask({ todolistId: props.todolistId, taskId: props.id, dataModel: { status } })
    },
    [props.todolistId, props.id],
  )
  const updateTaskTitle = useCallback(
    (title: string) => {
      if (title !== props.title) {
        updateTask({ todolistId: props.todolistId, taskId: props.id, dataModel: { title } })
      }
    },
    [props.todolistId, props.id],
  )
  const deleteTaskOnClick = useCallback(() => {
    deleteTask({ taskId: props.id, todolistId: props.todolistId })
  }, [props.todolistId, props.id])

  const isDisabled = props.taskEntityStatus === "loading"

  return (
    <div className={s.task}>
      <Checkbox
        checked={props.taskStatus === TaskStatuses.Completed}
        onChange={taskStatusOnChange}
        disabled={isDisabled}
        sx={{ padding: "0", marginRight: "5px" }}
      />
      <EditableSpan title={props.title} changeItem={updateTaskTitle} isDisabled={isDisabled} />
      <DeleteButton onClick={deleteTaskOnClick} isDisabled={isDisabled} />
    </div>
  )
})
