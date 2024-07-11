import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import s from "./Input.module.css"

type InputPropsType = {
  getItem: (value: string) => void
  initialValue?: string
  isStretched?: boolean
  label?: string
}

export const Input = memo((props: InputPropsType) => {
  const [inputValue, setInputValue] = useState<string>(props.initialValue || "")
  const [isError, setError] = useState<string>('')

  const submitInput = async () => {
    if (inputValue.length) {
      try {
        await props.getItem(inputValue)
        setInputValue('')
      } catch(err: any) {
        const error = err as Error
        setError(error.message)
      }
    } else {
      setError("Field is required")
    }
  }
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setInputValue(e.currentTarget.value)
  }
  const onKeyDownSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && submitInput()
  }
  const onBlur = () => {
    setError('')
  }

  const styles = props.isStretched
    ? {
        sx: { flexGrow: 1, width: '100%' },
      }
    : {}

  return (
    <div className={s.input}>
      <TextField
        id="standard-basic"
        variant="standard"
        error={!!isError}
        value={inputValue}
        onChange={inputOnChange}
        onKeyDown={onKeyDownSubmit}
        helperText={isError}
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
