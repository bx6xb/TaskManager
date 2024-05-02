import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
  title: string
  changeItem: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(props.title)

  const spanOnDoubleClick = () => {
    setIsEditMode(true)
  }

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const inputOnBlur = () => {
    props.changeItem(inputValue)
    setIsEditMode(false)
  }

  return isEditMode ? (
    <input value={inputValue} onChange={inputOnChange} onBlur={inputOnBlur} autoFocus />
  ) : (
    <span onDoubleClick={spanOnDoubleClick}>{props.title}</span>
  )
}
