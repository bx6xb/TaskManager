import { FormikHelpers, useFormik } from "formik"
import { Navigate } from "react-router-dom"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material"
import { memo } from "react"

import { selectIsAuthorized } from "../../store/loginReducer/selectors"
import { loginActions } from "../../store/loginReducer"
import s from "./Login.module.css"
import { useActions, useAppSelector } from "../../utils/reduxUtils"

export const Login = memo(() => {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const { login } = useActions(loginActions)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
      if (values.email && values.password) {
        const action = await login(values)

        // check if thunk was rejected by type value
        if (login.rejected.match(action)) {
          if (action.payload?.fieldsErrors) {
            const error = action.payload.fieldsErrors[0]
            console.log(error)
            formikHelpers.setFieldError(error.field, error.error)
          }
        }
      }
    },
  })

  if (isAuthorized) {
    return <Navigate to={"/todolists-list"} />
  }

  return (
    <div className={s.loginForm}>
      <Paper sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "10px" }}>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} className={s.form}>
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
            helperText={formik.errors.email}
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
export type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}
