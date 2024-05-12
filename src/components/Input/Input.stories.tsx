import { Input } from "./Input"
import { action } from "@storybook/addon-actions"

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

const getItemCallback = (value: string) => action(value)()
const onSubmitCallback = (value: string) => action(value)()

export const InputBaseExample = {
  args: {
    getItem: getItemCallback,
    onSubmit: onSubmitCallback,
  },
}
