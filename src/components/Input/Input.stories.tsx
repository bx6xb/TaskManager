import { useState } from "react"
import { Input } from "./Input"
import { action } from "@storybook/addon-actions"

export default {
  title: "Input",
  component: Input,
}

const callback = action("Input submitted")

export const InputBaseExample = () => {
  const [title, setTitle] = useState<string>("")
  return (
    <>
      <Input initialValue={title} getItem={setTitle} onSubmit={callback} />
      <br />
      {title}
    </>
  )
}
export const StretchedInputExample = () => {
  const [title, setTitle] = useState<string>("")
  return (
    <>
      <Input initialValue={title} getItem={setTitle} isStretched onSubmit={callback} />
      <br />
      {title}
    </>
  )
}
