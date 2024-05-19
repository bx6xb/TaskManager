import { loginReducer, setIsAuthorizedAC } from "./loginReducer"

let startState: {
  isAuthorized: boolean
}

beforeEach(() => {
  startState = {
    isAuthorized: false,
  }
})

test("isAuthorized value should be changed", () => {
  const newState = loginReducer(startState, setIsAuthorizedAC({ isAuthorized: true }))

  expect(newState).not.toBe(startState)
  expect(newState.isAuthorized).toBe(true)
})
