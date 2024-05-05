import { useState } from "react"
import { EditableSpan } from "./EditableSpan"

export default {
  title: "Editable Span",
  component: EditableSpan,
}

export const EditableSpanBaseExample = () => {
  const [title, setTitle] = useState<string>("title for changes")
  return <EditableSpan title={title} changeItem={setTitle} />
}
export const StretchedEditableSpanBaseExample = () => {
  const [title, setTitle] = useState<string>("title for changes")
  return (
    <div style={{ display: "flex" }}>
      <EditableSpan title={title} changeItem={setTitle} isStretched />
    </div>
  )
}
