import { useState } from "react"
import { Input } from "./Input"

type EditableSpanPropsType = {
  title: string
  changeItem: (value: string) => void
  isStretched?: boolean
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const spanOnDoubleClick = () => {
    setIsEditMode(true)
  }
  const inputOnSubmit = () => {
    setIsEditMode(false)
  }

  return isEditMode ? (
    <Input
      getItem={props.changeItem}
      initialValue={props.title}
      isStretched={props.isStretched}
      onSubmit={inputOnSubmit}
    />
  ) : (
    <span onDoubleClick={spanOnDoubleClick}>{props.title}</span>
  )
}
