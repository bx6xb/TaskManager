import { asyncActions, slice } from "./loginReducer"
import * as loginSelectors from "./selectors"

const loginActions = {
  ...asyncActions,
  ...slice.actions,
}

export { loginSelectors, loginActions }
