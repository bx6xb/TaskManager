import {
  AppStateType,
  appReducer,
  setErrorAC,
  setIsAuthorizedAC,
  setIsLoadingAC,
} from "./appReducer"

let startState: AppStateType

beforeEach(() => {
  startState = {
    isLoading: false,
    error: "",
    isAuthorized: false,
  }
})

// tests
test("isLoading value should be changed", () => {
  const newState = appReducer(startState, setIsLoadingAC(true))

  expect(newState).not.toBe(startState)
  expect(newState.isLoading).toBeTruthy()
})
test("error value should be changed", () => {
  const errorText = "some error"
  const newState = appReducer(startState, setErrorAC(errorText))

  expect(newState).not.toBe(startState)
  expect(newState.error).toBe(errorText)
})
test("isAuthorized value should be changed", () => {
  const newState = appReducer(startState, setIsAuthorizedAC(true))

  expect(newState).not.toBe(startState)
  expect(newState.isAuthorized).toBe(true)
})
