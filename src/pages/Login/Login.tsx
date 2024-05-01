import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Navigate } from "react-router-dom"
import { loginTC } from "../../store/loginReducer/loginReducer"

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
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <form onSubmit={formik.handleSubmit} style={{ width: "200px" }}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br />
        <input
          type="checkbox"
          name="rememberMe"
          checked={formik.values.rememberMe}
          onChange={formik.handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
