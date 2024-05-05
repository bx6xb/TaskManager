import { useState } from "react"
import { action } from "@storybook/addon-actions"
import { Snackbar } from "./Snackbar"

export default {
  title: "Snackbar",
  component: Snackbar,
}

const callback = action("Snackbar closed")

export const SnackbarBaseExample = () => {
  const [error, setError] = useState<string | null>(null)

  const setErrorOnClick = () => {
    setError("Some error")
  }
  const onClose = () => {
    callback()
    setError(null)
  }

  return (
    <>
      <button onClick={setErrorOnClick}>Set error</button>
      <Snackbar error={error} onClose={onClose} />
    </>
  )
}
