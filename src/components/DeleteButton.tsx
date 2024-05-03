import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

type DeleteButton = {
  onClick: () => void
}

export const DeleteButton = (props: DeleteButton) => {
  return (
    <IconButton onClick={props.onClick}>
      <DeleteIcon />
    </IconButton>
  )
}
