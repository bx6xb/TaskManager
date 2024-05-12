import { DeleteButton } from "./DeleteButton"
import { action } from "@storybook/addon-actions"

export default {
  title: "Components/Delete Button",
  component: DeleteButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

const callback = action("button was pressed")

export const DeleteButtonExample = {
  args: {
    onClick: callback,
    isDisabled: false,
  },
}
