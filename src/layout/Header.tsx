import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useAppDispatch, useAppSelector } from "../store/store"
import { logoutTC } from "../store/loginReducer/loginReducer"

export const Header = () => {
  const isAuthorized = useAppSelector((state) => state.login.isAuthorized)
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutTC())
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "green" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolists
          </Typography>
          {isAuthorized && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
