import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { ComponentProps, memo } from "react"

type DeleteButtonProps = ComponentProps<typeof IconButton>

export const DeleteButton = memo((props: DeleteButtonProps) => {
  return (
    <IconButton {...props}>
      <DeleteIcon />
    </IconButton>
  )
})
