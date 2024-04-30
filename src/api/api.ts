import axios from "axios"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
})

// api
export const todolistAPI = {
  fetchTodolists() {
    return instance.get<TododlistDomainType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TododlistDomainType }>>("todo-lists", { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolistTitle(todolistId: string, todolistTitle: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: todolistTitle })
  },
}

export const tasksAPI = {
  fetchTasks(todolistId: string, count?: string, page?: string) {
    return instance.get<fetchTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<{ item: TaskDomainType }>>(`todo-lists/${todolistId}/tasks`, {
      title: taskTitle,
    })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, data: UpdateTaskDataType) {
    return instance.put<ResponseType<{ item: TaskDomainType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      data
    )
  },
}

// types
export type TododlistDomainType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}
export type TaskDomainType = {
  id: string
  title: string
  description: null | string
  todoListId: string
  order: number
  status: number
  priority: number
  startDate: null | string
  deadline: null | string
  addedDate: string
}
export type fetchTasksResponse = {
  items: TaskDomainType[]
  totalCount: number
  error: string
}
export type UpdateTaskDataType = {
  title: string
  description: null | string
  status: number
  priority: number
  startDate: null | string
  deadline: null | string
}
