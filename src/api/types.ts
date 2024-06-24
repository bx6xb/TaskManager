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
