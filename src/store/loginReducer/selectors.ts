import { AppRootStateType } from "../store"

export const selectIsAuthorized = (state: AppRootStateType) => state.login.isAuthorized
