import { useFormik } from "formik"
import { Navigate } from "react-router-dom"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material"
import { memo } from "react"

type LoginPropsType = {
  isAuthorized: boolean
  onFormSubmit: (values: FormType) => void
}

export const Login = memo((props: LoginPropsType) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      if (values.email && values.password) {
        props.onFormSubmit(values)
      }
    },
  })

  if (props.isAuthorized) {
    return <Navigate to={"/todolists-list"} />
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
            sx={{ marginBottom: "10px" }}
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
})

// types
export type FormType = {
  email: string
  password: string
  rememberMe: boolean
}
