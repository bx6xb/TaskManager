import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import s from "./Input.module.css"

type InputPropsType = {
  getItem: (value: string) => void
  onSubmit?: () => void
  initialValue?: string
  isStretched?: boolean
  label?: string
}

export const Input = memo((props: InputPropsType) => {
  const [inputValue, setInputValue] = useState<string>(props.initialValue || "")
  const [isError, setError] = useState<boolean>(false)

  const submitInput = () => {
    if (inputValue.length) {
      setInputValue("")
      props.getItem(inputValue)
      props.onSubmit && props.onSubmit()
    } else {
      setError(true)
    }
  }
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setInputValue(e.currentTarget.value)
  }
  const onKeyDownSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && submitInput()
  }
  const onBlur = () => {
    setError(false)
  }

  const styles = props.isStretched
    ? {
        sx: { flexGrow: 1 },
      }
    : {}

  return (
    <div className={s.input}>
      <TextField
        id="standard-basic"
        variant="standard"
        error={isError}
        value={inputValue}
        onChange={inputOnChange}
        onKeyDown={onKeyDownSubmit}
        helperText={isError && "Field is required"}
        label={props.label}
        onBlur={onBlur}
        {...styles}
      />

      <IconButton onClick={submitInput} sx={{ padding: "0" }}>
        <AddIcon />
      </IconButton>
    </div>
  )
})
