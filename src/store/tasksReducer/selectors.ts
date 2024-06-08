import { AppRootStateType } from "../store"

export const selectTasks = (state: AppRootStateType) => state.tasks
