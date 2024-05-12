import { EditableSpan } from "./EditableSpan"
import { action } from "@storybook/addon-actions"

export default {
  title: "Components/Editable Span",
  component: EditableSpan,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

const callback = (value: string) => action(value)()

export const EditableSpanBaseExample = {
  args: {
    title: "Title",
    changeItem: callback,
  },
}
