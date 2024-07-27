import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { memo } from "react"

type HeaderPropsType = {
  isAuthorized: boolean
  logout: () => void
}

export const Header = memo((props: HeaderPropsType) => {
  const logout = () => {
    props.logout()
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "green" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolists
          </Typography>
          {props.isAuthorized && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
})
