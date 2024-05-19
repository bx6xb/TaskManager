import { action } from "@storybook/addon-actions"
import { Login } from "./Login"

export default {
  title: "Login",
  component: Login,
}

const callback = action("Form submitted")

export const LoginBaseExample = () => {
  return <Login />
}
