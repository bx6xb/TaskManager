import { ChangeEvent, KeyboardEvent, useState } from "react"

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
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={inputOnChangeHandler}
        onKeyDown={onKeyDownSubmit}
      />
      <button onClick={btnOnClick}>+</button>
    </div>
  )
}
