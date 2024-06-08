import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import { TextField } from "@mui/material"

type EditableSpanPropsType = {
  title: string
  changeItem: (value: string) => void
  isStretched?: boolean
  isDisabled?: boolean
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
  const [inputValue, setInputValue] = useState<string>(props.title)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false)

  const submitInput = () => {
    if (inputValue) {
      props.changeItem(inputValue)
      setIsEditMode(false)
    } else {
      setError(true)
    }
  }
  const spanOnDoubleClick = () => {
    setIsEditMode(true)
  }
  const inputOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
    setError(false)
  }
  const onKeyDownSubmit = (e: KeyboardEvent<HTMLDivElement>) => {
    e.key === "Enter" && submitInput()
  }

  const styles = props.isStretched
    ? {
        sx: { flexGrow: 1 },
      }
    : {}

  return isEditMode ? (
    <TextField
      id="standard-basic"
      variant="standard"
      value={inputValue}
      onChange={inputOnChange}
      onKeyDown={onKeyDownSubmit}
      onBlur={submitInput}
      helperText={isError && "Field is required"}
      error={isError}
      disabled={props.isDisabled}
      autoFocus
      {...styles}
    />
  ) : (
    <span onDoubleClick={spanOnDoubleClick}>{props.title}</span>
  )
})
