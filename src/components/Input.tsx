import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import AddIcon from "@mui/icons-material/Add"

type InputPropsType = {
  getItem: (value: string) => void
  onSubmit?: () => void
  initialValue?: string
  isStretched?: boolean
}

export const Input = (props: InputPropsType) => {
  const [inputValue, setInputValue] = useState<string>(props.initialValue || "")

  const submitInput = () => {
    if (inputValue.length) {
      setInputValue("")
      props.getItem(inputValue)
      props.onSubmit && props.onSubmit()
    }
  }
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const onKeyDownSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitInput()
    }
  }

  // styles
  const textFieldStyles = props.isStretched
    ? {
        sx: { flexGrow: 1 },
      }
    : {}

  return (
    <div
      style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}
      onBlur={props.onSubmit}
    >
      <TextField
        id="standard-basic"
        variant="standard"
        value={inputValue}
        onChange={inputOnChange}
        onKeyDown={onKeyDownSubmit}
        autoFocus
        onBlur={submitInput}
        {...textFieldStyles}
      />

      <IconButton onClick={submitInput} sx={{ padding: "0" }}>
        <AddIcon />
      </IconButton>
    </div>
  )
}
