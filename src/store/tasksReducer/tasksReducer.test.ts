import { TaskPriorities, TaskStatuses, UpdateTaskDataType } from "../../api/api"
import { logoutTC } from "../loginReducer/loginReducer"
import { EntityStatusType } from "../todolistReducer/todolistReducer"
import {
  TaskEntityType,
  createTaskTC,
  deleteTaskTC,
  setTaskStatusAC,
  tasksReducer,
  updateTaskTC,
} from "./tasksReducer"

const tasks: TaskEntityType[] = [
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
    entityStatus: "idle",
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
    entityStatus: "idle",
  },
]

// tests
test("task should be created", () => {
  const param = { todolistId: "todolistId1", task: tasks[0] }
  const newState = tasksReducer(
    { todolistId1: [] },
    createTaskTC.fulfilled(param, "requestId", {
      ...param,
      taskTitle: param.task.title,
    })
  )

  expect(newState["todolistId1"].length).toBe(1)
  expect(newState["todolistId1"][0].id).toBe("taskId1")
})
test("task should be deleted", () => {
  const newState = tasksReducer(
    { todolistId1: [tasks[1]] },
    deleteTaskTC.fulfilled({ todolistId: "todolistId1", taskId: "taskId2" }, "requestId", {
      todolistId: "todolistId1",
      taskId: "taskId2",
    })
  )

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

  const param = { todolistId: "todolistId1", taskId: "taskId2", data }
  const newState = tasksReducer(
    { todolistId1: [tasks[1]] },
    updateTaskTC.fulfilled(param, "requestId", { ...param, dataModel: data })
  )

  expect(newState["todolistId1"][0].deadline).toBe("some deadline")
  expect(newState["todolistId1"][0].description).toBe("some description")
  expect(newState["todolistId1"][0].priority).toBe(TaskPriorities.Later)
  expect(newState["todolistId1"][0].startDate).toBe("some start date")
  expect(newState["todolistId1"][0].status).toBe(TaskStatuses.Draft)
  expect(newState["todolistId1"][0].title).toBe("new task title")
})
test("task status should be changed", () => {
  const newStatus: EntityStatusType = "succeeded"
  const newState = tasksReducer(
    {
      todolistId1: tasks,
    },
    setTaskStatusAC({ todolistId: "todolistId1", taskId: "taskId2", entityStatus: newStatus })
  )

  expect(newState["todolistId1"][1].entityStatus).toBe(newStatus)
})
test("tasks state should be cleared", () => {
  const newState = tasksReducer(
    { ["todolistId1"]: tasks },
    logoutTC.fulfilled({ isAuthorized: false }, "requestId")
  )

  expect(newState).toEqual({})
})
