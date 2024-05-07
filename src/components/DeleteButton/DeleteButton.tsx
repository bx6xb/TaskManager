import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { memo } from "react"

type DeleteButton = {
  onClick: () => void
  isDisabled?: boolean
}

export const DeleteButton = memo((props: DeleteButton) => {
  return (
    <IconButton onClick={props.onClick} disabled={props.isDisabled}>
      <DeleteIcon />
    </IconButton>
  )
})
