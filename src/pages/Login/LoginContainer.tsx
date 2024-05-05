import { loginTC } from "../../store/loginReducer/loginReducer"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Login } from "./Login"

export type FormType = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginContainer = () => {
  const isAuthorized = useAppSelector((state) => state.login.isAuthorized)
  const dispatch = useAppDispatch()

  const onFormSubmit = (values: FormType) => {
    dispatch(loginTC(values))
  }

  return <Login isAuthorized={isAuthorized} onFormSubmit={onFormSubmit} />
}
