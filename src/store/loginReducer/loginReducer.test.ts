import { LoginStateType, loginReducer, setIsAuthorizedAC } from "./loginReducer"

let startState: LoginStateType

beforeEach(() => {
  startState = {
    isAuthorized: false,
  }
})

test("isAuthorized value should be changed", () => {
  const newState = loginReducer(startState, setIsAuthorizedAC(true))

  expect(newState).not.toBe(startState)
  expect(newState.isAuthorized).toBe(true)
})
