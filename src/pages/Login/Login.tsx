import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Navigate } from "react-router-dom"
import { loginTC } from "../../store/loginReducer/loginReducer"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material"

export const Login = () => {
  const isAuthorized = useAppSelector((state) => state.login.isAuthorized)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      if (values.email && values.password) {
        dispatch(loginTC(values))
      }
    },
  })

  if (isAuthorized) {
    return <Navigate to={"/todolist-list"} />
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "10px" }}>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "200px" }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            sx={{ marginBottom: "5px" }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            placeholder="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
            }
            label="Remember me"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  )
}
