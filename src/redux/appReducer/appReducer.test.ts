import { AppStateType, appReducer, setErrorAC, setIsLoadingAC } from "./appReducer"

let startState: AppStateType

beforeEach(() => {
  startState = {
    isLoading: false,
    error: "",
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
