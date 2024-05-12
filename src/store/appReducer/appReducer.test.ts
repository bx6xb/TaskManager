import {
  AppStateType,
  appReducer,
  setErrorAC,
  setIsAppInitializedAC,
  setIsLoadingAC,
} from "./appReducer"

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
  const newState = appReducer(startState, setIsLoadingAC({ isLoading: true }))

  expect(newState).not.toBe(startState)
  expect(newState.isLoading).toBeTruthy()
})
test("error value should be changed", () => {
  const error = "some error"
  const newState = appReducer(startState, setErrorAC({ error }))

  expect(newState).not.toBe(startState)
  expect(newState.error).toBe(error)
})
test("isAppInitialized value should be changed", () => {
  const newState = appReducer(startState, setIsAppInitializedAC({ isAppInitialized: true }))

  expect(newState).not.toBe(startState)
  expect(newState.isAppInitialized).toBe(true)
})
