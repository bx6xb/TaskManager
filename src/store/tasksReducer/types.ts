import { TaskDomainType } from "../../api/types"
import { EntityStatusType } from "../todolistReducer/types"

export type TaskEntityType = {
  entityStatus: EntityStatusType
} & TaskDomainType
export type TasksStateType = {
  [todolistId: string]: TaskEntityType[]
}
