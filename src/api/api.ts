import axios from "axios"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "0f10c672-c4d1-4613-be30-bf57a61f45f5",
  },
})

// api
export const authAPI = {
  me() {
    return instance.get<ResponseType<UserDomainType>>("auth/me")
  },
  login(data: LoginDataType) {
    return instance.post<ResponseType<{ userId: number }>>("auth/login", data)
  },
  logout() {
    return instance.delete<ResponseType>("auth/login")
  },
}
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
    return instance.get<FetchTasksResponse>(`todo-lists/${todolistId}/tasks`)
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
export type FieldsErrorsType = { field: string; error: string }
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldsErrorsType[]
  data: D
}
export type TaskDomainType = {
  id: string
  title: string
  description: null | string
  todoListId: string
  order: number
  status: TaskStatuses
  priority: TaskPriorities
  startDate: null | string
  deadline: null | string
  addedDate: string
}
export type FetchTasksResponse = {
  items: TaskDomainType[]
  totalCount: number
  error: string | null
}
export type UpdateTaskDataType = {
  title: string
  description: null | string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: null | string
  deadline: null | string
}
export type UpdateTaskModelType = {
  title?: string
  description?: null | string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: null | string
  deadline?: null | string
}
export type UserDomainType = {
  id: number
  email: string
  login: string
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}
