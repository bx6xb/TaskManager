import type { Meta, StoryObj } from "@storybook/react"
import { EditableSpan } from "./EditableSpan"

const title = "Click two times to edit"
const getItem = (item: string) => alert(item)

const meta: Meta<typeof EditableSpan> = {
  title: "Components/Editable Span",
  component: EditableSpan,
  args: {
    title,
    getItem,
    isStretched: false,
    isDisabled: false,
  },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanExample: Story = {}
export const DisabledEditableSpan: Story = {
  args: {
    isDisabled: true,
  },
}
export const StretchedEditableSpan: Story = {
  render() {
    return (
      <div style={{ display: "flex", width: "400px" }}>
        <EditableSpan title={title} getItem={getItem} isStretched />
      </div>
    )
  },
}
