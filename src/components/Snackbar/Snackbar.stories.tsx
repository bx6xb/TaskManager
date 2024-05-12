import { action } from "@storybook/addon-actions"
import { Snackbar } from "./Snackbar"

export default {
  title: "Components/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
}

const callback = action("Snackbar closed")

export const SnackbarBaseExample = {
  args: {
    error: "Some error",
    onClose: callback,
  },
}
