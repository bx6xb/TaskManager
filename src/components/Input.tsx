import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import AddIcon from "@mui/icons-material/Add"

type InputPropsType = {
  getItem: (value: string) => void
  initialValue?: string
}

export const Input = (props: InputPropsType) => {
  const [inputValue, setInputValue] = useState<string>(props.initialValue || "")

  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const btnOnClick = () => {
    setInputValue("")
    props.getItem(inputValue)
  }
  const onKeyDownSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputValue("")
      props.getItem(inputValue)
    }
  }

  return (
    <div style={{ display: "flex", alignContent: "center" }}>
      <TextField
        id="standard-basic"
        variant="standard"
        value={inputValue}
        onChange={inputOnChangeHandler}
        onKeyDown={onKeyDownSubmit}
      />

      <IconButton onClick={btnOnClick}>
        <AddIcon />
      </IconButton>
    </div>
  )
}
