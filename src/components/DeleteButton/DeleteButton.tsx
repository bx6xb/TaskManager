import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

type DeleteButton = {
  onClick: () => void
  isDisabled?: boolean
}

export const DeleteButton = (props: DeleteButton) => {
  return (
    <IconButton onClick={props.onClick} disabled={props.isDisabled}>
      <DeleteIcon />
    </IconButton>
  )
}
