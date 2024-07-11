import type { Meta, StoryObj } from "@storybook/react"
import { Snackbar } from "./Snackbar"
import { useEffect, useState } from "react"

const onClose = () => alert("Snackbar hid")

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof Snackbar>

export const SnackbarExample: Story = {
  args: {
    onClose,
    error: "Some error",
  },
  render() {
    const [error, setError] = useState("")
    const [timeoutId, setTimeoutId] = useState<number>()

    useEffect(() => {
      if (error) {
        const id = setTimeout(() => {
          setError("")
        }, 2000)
        setTimeoutId(+id)
      }

      return () => clearTimeout(timeoutId)
    }, [error])

    return (
      <>
        <button onClick={() => setError("Some error")}>Show snackbar</button>
        <Snackbar onClose={onClose} error={error} />
      </>
    )
  },
}
