import axios from "axios"
import {
  FetchTasksResponse,
  LoginDataType,
  ResponseType,
  TaskDomainType,
  TododlistDomainType,
  UpdateTaskDataType,
  UserDomainType,
} from "./types"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY,
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
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: todolistTitle,
    })
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
      data,
    )
  },
}
