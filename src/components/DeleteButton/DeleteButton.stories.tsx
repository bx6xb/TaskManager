import { DeleteButton } from "./DeleteButton"
import { action } from "@storybook/addon-actions"

export default {
  title: "Delete Button",
  component: DeleteButton,
}

const callback = action("button was pressed")

export const DeleteButtonBaseExample = () => {
  return <DeleteButton onClick={callback} />
}
export const DisabledDeleteButtonExample = () => {
  return <DeleteButton onClick={callback} isDisabled />
}
