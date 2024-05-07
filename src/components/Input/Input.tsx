import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import AddIcon from "@mui/icons-material/Add"

type InputPropsType = {
  getItem: (value: string) => void
  onSubmit?: () => void
  initialValue?: string
  isStretched?: boolean
  label?: string
}

export const Input = memo((props: InputPropsType) => {
  const [inputValue, setInputValue] = useState<string>(props.initialValue || "")
  const [isError, setIsError] = useState<boolean>(false)

  const submitInput = () => {
    if (inputValue.length) {
      setInputValue("")
      props.getItem(inputValue)
      props.onSubmit && props.onSubmit()
    } else {
      setIsError(true)
    }
  }
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false)
    setInputValue(e.currentTarget.value)
  }
  const onKeyDownSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && submitInput()
  }

  const styles = props.isStretched
    ? {
        sx: { flexGrow: 1 },
      }
    : {}

  return (
    <div style={{ display: "flex" }}>
      <TextField
        id="standard-basic"
        variant="standard"
        error={isError}
        value={inputValue}
        onChange={inputOnChange}
        onKeyDown={onKeyDownSubmit}
        helperText={isError && "Field is required"}
        label={props.label}
        {...styles}
      />

      <IconButton onClick={submitInput} sx={{ padding: "0" }}>
        <AddIcon />
      </IconButton>
    </div>
  )
})
