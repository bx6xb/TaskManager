import { TaskPriorities, TaskStatuses, UpdateTaskDataType } from "../../api/api"
import { todolistsDomain } from "../todolistsReducer/todolistsReducer.test"
import {
  createTaskAC,
  createTasksForTodolistAC,
  deleteTaskAC,
  deleteTasksTodolistAC,
  setTasksAC,
  tasksReducer,
  updateTaskAC,
} from "./tasksReducer"

const tasks = [
  {
    id: "taskId1",
    title: "zenow",
    description: null,
    todoListId: "todolistId1",
    order: 0,
    status: 0,
    priority: 1,
    startDate: null,
    deadline: null,
    addedDate: "2024-04-30T15:12:30.51",
  },
  {
    id: "taskId2",
    title: "zenow",
    description: null,
    todoListId: "todolistId1",
    order: 0,
    status: 0,
    priority: 1,
    startDate: null,
    deadline: null,
    addedDate: "2024-04-30T15:12:30.51",
  },
]

// tests
test("tasks array sholud be created for new todolist", () => {
  const newState = tasksReducer({}, createTasksForTodolistAC(todolistsDomain))

  expect(Object.keys(newState).length).toBe(2)
  expect(newState["todolistId1"]).toEqual([])
  expect(newState["todolistId2"]).toEqual([])
})
test("tasks should be set", () => {
  const newState = tasksReducer({ todolistId1: [] }, setTasksAC("todolistId1", tasks))

  expect(newState["todolistId1"].length).toBe(2)
})
test("task should be created", () => {
  const newState = tasksReducer({ todolistId1: [] }, createTaskAC("todolistId1", tasks[0]))

  expect(newState["todolistId1"].length).toBe(1)
  expect(newState["todolistId1"][0].id).toBe("taskId1")
})
test("task should be deleted", () => {
  const newState = tasksReducer({ todolistId1: [tasks[1]] }, deleteTaskAC("todolistId1", "taskId2"))

  expect(newState["todolistId1"].length).toBe(0)
})
test("task should be updated", () => {
  const data: UpdateTaskDataType = {
    deadline: "some deadline",
    description: "some description",
    priority: TaskPriorities.Later,
    startDate: "some start date",
    status: TaskStatuses.Draft,
    title: "new task title",
  }

  const newState = tasksReducer(
    { todolistId1: [tasks[1]] },
    updateTaskAC("todolistId1", "taskId2", data)
  )

  expect(newState["todolistId1"][0].deadline).toBe("some deadline")
  expect(newState["todolistId1"][0].description).toBe("some description")
  expect(newState["todolistId1"][0].priority).toBe(TaskPriorities.Later)
  expect(newState["todolistId1"][0].startDate).toBe("some start date")
  expect(newState["todolistId1"][0].status).toBe(TaskStatuses.Draft)
  expect(newState["todolistId1"][0].title).toBe("new task title")
})
test("todolist should be deleted", () => {
  const newState = tasksReducer(
    { todolistId1: [tasks[1]], todolistId2: [] },
    deleteTasksTodolistAC("todolistId2")
  )

  expect(Object.keys(newState).length).toBe(1)
  expect(newState["todolistId2"]).toBeUndefined()
})
