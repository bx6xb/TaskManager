import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./Input"

const getItem = (item: string) => alert(item)

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    getItem,
    initialValue: "",
    isStretched: false,
    label: "Label",
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const InputExample: Story = {}
export const StretchedInput: Story = {
  args: {
    isStretched: true,
  },
}
