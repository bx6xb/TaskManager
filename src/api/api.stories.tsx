import { useEffect, useState } from "react"
import { tasksAPI, todolistAPI } from "./api"

export default {
  title: "api",
}

export const fetchTodolistsExample = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistAPI.fetchTodolists().then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolistExample = () => {
  const [state, setState] = useState<any>(null)
  const [todolistTitle, setTodolistTitle] = useState<string>("")

  const createTodolistHandler = () => {
    todolistAPI.createTodolist(todolistTitle).then((res) => setState(res.data))
  }

  return (
    <div>
      <input
        type="text"
        value={todolistTitle}
        onChange={(e) => setTodolistTitle(e.currentTarget.value)}
        placeholder="todolist title"
      />
      <br />
      <button onClick={createTodolistHandler}>Create todolist</button>
      <br />
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const DeleteTodolistExample = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")

  const deleteTodolistHandler = () => {
    todolistAPI.deleteTodolist(todolistId).then((res) => setState(res.data))
  }

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolist id"
      />
      <br />
      <button onClick={deleteTodolistHandler}>Delete todolist</button>
      <br />
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const UpdateTodolistExample = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [todolistTitle, setTodolistTitle] = useState<string>("")

  const updateTodolistTitleHandler = () => {
    todolistAPI.updateTodolistTitle(todolistId, todolistTitle).then((res) => setState(res.data))
  }

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolist id"
      />
      <br />
      <input
        type="text"
        value={todolistTitle}
        onChange={(e) => setTodolistTitle(e.currentTarget.value)}
        placeholder="todolist title"
      />
      <br />
      <button onClick={updateTodolistTitleHandler}>Update todolist title</button>
      <br />
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const fetchTasksExample = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")

  const fetchTasksHandler = () => {
    tasksAPI.fetchTasks(todolistId).then((res) => setState(res.data))
  }

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolist id"
      />
      <br />
      <button onClick={fetchTasksHandler}>Get tasks</button>
      <br />
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const CreateTaskExample = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskTitle, setTaskTitle] = useState<string>("")

  const createTaskHandler = () => {
    tasksAPI.createTask(todolistId, taskTitle).then((res) => setState(res.data))
  }

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolist id"
      />
      <br />
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.currentTarget.value)}
        placeholder="task title"
      />
      <br />
      <button onClick={createTaskHandler}>Create task</button>
      <br />
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const DeleteTaskExample = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")

  const deleteTaskHandler = () => {
    tasksAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data))
  }

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolist id"
      />
      <br />
      <input
        type="text"
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
        placeholder="task id"
      />
      <br />
      <button onClick={deleteTaskHandler}>Delete task</button>
      <br />
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const UpdateTaskTitleExample = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")
  const [taskTitle, setTaskTitle] = useState<string>("")

  const updateTaskTitleHandler = async () => {
    // fetch tasks for using data
    const fetchingTasksResponse = await tasksAPI.fetchTasks(todolistId)

    // get necessary properties
    const { description, status, priority, startDate, deadline } =
      fetchingTasksResponse.data.items.find((t) => t.id === taskId)!

    // updating task
    const updatingTaskResponse = await tasksAPI.updateTask(todolistId, taskId, {
      title: taskTitle,
      description,
      status,
      priority,
      startDate,
      deadline,
    })

    setState(updatingTaskResponse.data)
  }

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolist id"
      />
      <br />
      <input
        type="text"
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
        placeholder="task id"
      />
      <br />
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.currentTarget.value)}
        placeholder="task title"
      />
      <br />
      <button onClick={updateTaskTitleHandler}>Update task title</button>
      <br />
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}
