import { TododlistDomainType } from "../../api/api"
import {
  TodolistStateEntityType,
  createTodolistAC,
  deleteTodolistAC,
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

const todolistsEntity: TodolistStateEntityType[] = [
  {
    addedDate: "",
    id: "todolistId1",
    order: 0,
    title: "What to learn",
    filter: "all",
  },
  {
    addedDate: "",
    id: "todolistId2",
    order: 0,
    title: "What to buy",
    filter: "all",
  },
]

// tests
test("todolists should be set", () => {
  const newState = todolistReducer([], setTodolistsAC(todolistsDomain))

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

  const newState = todolistReducer(todolistsEntity, createTodolistAC(newTodolist))

  expect(newState.length).toBe(3)
  expect(newState[0].id).toBe("todolistId3")
})
test("todolist should be deleted", () => {
  const newState = todolistReducer(todolistsEntity, deleteTodolistAC("todolistId1"))

  expect(newState.length).toBe(1)
  expect(newState[0].id).toBe("todolistId2")
})
test("todolist title should be updated", () => {
  const newTodolistTitle = "new todolist title"
  const newState = todolistReducer(
    todolistsEntity,
    updateTodolistTitleAC("todolistId1", newTodolistTitle)
  )

  expect(newState[0].title).toBe(newTodolistTitle)
})
