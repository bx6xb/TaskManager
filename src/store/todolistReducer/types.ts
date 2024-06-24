import { TododlistDomainType } from "../../api/types"

export type FilterType = "all" | "completed" | "active"
export type EntityStatusType = "idle" | "loading" | "succeeded" | "canceled"
export type TodolistEntityType = {
  filter: FilterType
  entityStatus: EntityStatusType
} & TododlistDomainType
