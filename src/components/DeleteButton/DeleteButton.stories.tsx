import type { Meta, StoryObj } from "@storybook/react"
import { DeleteButton } from "./DeleteButton"
import { action } from "@storybook/addon-actions"

const callback = action("Click")

const meta: Meta<typeof DeleteButton> = {
  title: "Components/Delete Button",
  component: DeleteButton,
  args: {
    disabled: false,
    onClick: callback,
  },
}

export default meta
type Story = StoryObj<typeof DeleteButton>

export const DeleteButtonExample: Story = {}
export const DisabledDeleteButton: Story = {
  args: {
    disabled: true,
  },
}
