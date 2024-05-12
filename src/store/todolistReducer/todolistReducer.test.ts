import { TododlistDomainType } from "../../api/api"
import {
  EntityStatusType,
  FilterType,
  TodolistEntityType,
  createTodolistAC,
  deleteTodolistAC,
  updateTodolistFilterAC,
  updateTodolistStatusAC,
  setTodolistsAC,
  todolistReducer,
  updateTodolistTitleAC,
} from "./todolistReducer"

export const todolistsDomain: TododlistDomainType[] = [
  {
    addedDate: "",
    id: "todolistId1",
    order: 0,
    title: "What to learn",
  },
  {
    addedDate: "",
    id: "todolistId2",
    order: 0,
    title: "What to buy",
  },
]

const todolistsEntity: TodolistEntityType[] = [
  {
    addedDate: "",
    id: "todolistId1",
    order: 0,
    title: "What to learn",
    filter: "all",
    entityStatus: "idle",
  },
  {
    addedDate: "",
    id: "todolistId2",
    order: 0,
    title: "What to buy",
    filter: "all",
    entityStatus: "idle",
  },
]

// tests
test("todolists should be set", () => {
  const newState = todolistReducer([], setTodolistsAC({ todolists: todolistsDomain }))

  expect(newState.length).toBe(2)
  expect(newState.every((tl) => tl.filter == "all")).toBeTruthy()
})
test("todolist should be created", () => {
  const newTodolist = {
    addedDate: "",
    id: "todolistId3",
    order: 0,
    title: "What to visit",
  }

  const newState = todolistReducer(todolistsEntity, createTodolistAC({ todolist: newTodolist }))

  expect(newState.length).toBe(3)
  expect(newState[0].id).toBe("todolistId3")
})
test("todolist should be deleted", () => {
  const newState = todolistReducer(todolistsEntity, deleteTodolistAC({ todolistId: "todolistId1" }))

  expect(newState.length).toBe(1)
  expect(newState[0].id).toBe("todolistId2")
})
test("todolist title should be updated", () => {
  const newTodolistTitle = "new todolist title"
  const newState = todolistReducer(
    todolistsEntity,
    updateTodolistTitleAC({ todolistId: "todolistId1", todolistTitle: newTodolistTitle })
  )

  expect(newState[0].title).toBe(newTodolistTitle)
})
test("todolist status should be changed", () => {
  const newStatus: EntityStatusType = "loading"
  const newState = todolistReducer(
    todolistsEntity,
    updateTodolistStatusAC({ entityStatus: newStatus, todolistId: "todolistId1" })
  )

  expect(newState[0].entityStatus).toBe(newStatus)
})
test("todolist filter should be changed", () => {
  const newFilter: FilterType = "active"
  const newState = todolistReducer(
    todolistsEntity,
    updateTodolistFilterAC({ todolistId: "todolistId2", filter: newFilter })
  )

  expect(newState[1].filter).toBe(newFilter)
})
