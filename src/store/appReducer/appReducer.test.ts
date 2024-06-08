import { AppStateType, appReducer, setError, setIsAppInitialized, setIsLoading } from "./appReducer"

let startState: AppStateType

beforeEach(() => {
  startState = {
    isLoading: false,
    error: "",
    isAppInitialized: false,
  }
})

// tests
test("isLoading value should be changed", () => {
  const newState = appReducer(startState, setIsLoading({ isLoading: true }))

  expect(newState).not.toBe(startState)
  expect(newState.isLoading).toBeTruthy()
})
test("error value should be changed", () => {
  const error = "some error"
  const newState = appReducer(startState, setError({ error }))

  expect(newState).not.toBe(startState)
  expect(newState.error).toBe(error)
})
test("isAppInitialized value should be changed", () => {
  const newState = appReducer(startState, setIsAppInitialized({ isAppInitialized: true }))

  expect(newState).not.toBe(startState)
  expect(newState.isAppInitialized).toBe(true)
})
