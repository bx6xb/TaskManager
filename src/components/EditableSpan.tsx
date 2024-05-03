import { TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"

type EditableSpanPropsType = {
  title: string
  changeItem: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(props.title)

  const submitInputValue = () => {
    props.changeItem(inputValue)
    setIsEditMode(false)
  }
  const spanOnDoubleClick = () => {
    setIsEditMode(true)
  }
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const onKeyDownSubmit = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      submitInputValue()
    }
  }

  return isEditMode ? (
    <TextField
      id="standard-basic"
      variant="standard"
      value={inputValue}
      onChange={inputOnChange}
      onBlur={submitInputValue}
      autoFocus
      onKeyDown={onKeyDownSubmit}
    />
  ) : (
    <span onDoubleClick={spanOnDoubleClick}>{props.title}</span>
  )
}
