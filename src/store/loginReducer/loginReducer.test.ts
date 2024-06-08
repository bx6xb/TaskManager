import { auth, loginReducer } from "./loginReducer"

let startState: {
  isAuthorized: boolean
}

beforeEach(() => {
  startState = {
    isAuthorized: false,
  }
})

test("isAuthorized value should be changed", () => {
  const newState = loginReducer(startState, auth.fulfilled({ isAuthorized: true }, "requestId"))

  expect(newState).not.toBe(startState)
  expect(newState.isAuthorized).toBe(true)
})
