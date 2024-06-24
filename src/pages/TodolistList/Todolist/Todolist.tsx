import { memo, useCallback, useEffect } from "react"
import { Input } from "../../../components/Input/Input"
import { Task } from "./Task/Task"
import { Button, Paper } from "@mui/material"
import { DeleteButton } from "../../../components/DeleteButton/DeleteButton"
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan"
import { tasksActions } from "../../../store/tasksReducer"
import { todolistActions } from "../../../store/todolistReducer"
import s from "./Todolist.module.css"
import { useActions } from "../../../utils/reduxUtils"
import { EntityStatusType, FilterType } from "../../../store/todolistReducer/types"
import { TaskEntityType } from "../../../store/tasksReducer/types"

type TodolistPropsType = {
  id: string
  title: string
  todolistStatus: EntityStatusType
  filter: FilterType
  tasks: TaskEntityType[]
  demo?: boolean
}

export const Todolist = memo((props: TodolistPropsType) => {
  const { deleteTodolist, updateTodolistTitle, updateTodolistFilter } = useActions(todolistActions)
  const { fetchTasks, createTask } = useActions(tasksActions)

  // fetch tasks for todolist on first init
  useEffect(() => {
    if (!props.demo) {
      fetchTasks(props.id)
    }
  }, [])

  // todolist callbacks
  const deleteTodolistCallback = useCallback(() => {
    deleteTodolist(props.id)
  }, [props.id])
  const updateTodolistTitleCallback = useCallback(
    (todolistTitle: string) => {
      if (todolistTitle !== props.title) {
        updateTodolistTitle({ todolistId: props.id, todolistTitle })
      }
    },
    [props.id],
  )
  const updateTodolistFilterCallback = useCallback(
    (filter: FilterType) => {
      updateTodolistFilter({ filter, todolistId: props.id })
    },
    [props.id],
  )

  // tasks callbacks
  const createTaskCallback = useCallback(
    async (taskTitle: string) => {
      const action = await createTask({ todolistId: props.id, taskTitle })
      if (tasksActions.createTask.rejected.match(action)) {
        throw new Error(action.payload)
      }
    },
    [props.id],
  )
  const buttonStyleHandler = useCallback(
    (filter: FilterType) => {
      return props.filter === filter ? "contained" : "outlined"
    },
    [props.filter],
  )

  const isDisabled = props.todolistStatus === "loading"

  const renderFilterButton = (filter: FilterType, color: "primary" | "secondary" | "warning") => {
    return (
      <Button
        variant={buttonStyleHandler(filter)}
        color={color}
        onClick={() => updateTodolistFilterCallback(filter)}
      >
        {filter[0].toUpperCase() + filter.slice(1)}
      </Button>
    )
  }

  return (
    <Paper elevation={8} sx={{ padding: "20px" }}>
      <h3 className={s.title}>
        <EditableSpan changeItem={updateTodolistTitleCallback} title={props.title} />
        <DeleteButton onClick={deleteTodolistCallback} isDisabled={isDisabled} />
      </h3>

      <div className={s.input}>
        <Input getItem={createTaskCallback} isStretched label="Add task" />
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
          />
        ))
      ) : (
        <h3>No tasks...</h3>
      )}

      <div className={s.buttonsWrapper}>
        {renderFilterButton("all", "primary")}
        {renderFilterButton("completed", "secondary")}
        {renderFilterButton("active", "warning")}
      </div>
    </Paper>
  )
})
