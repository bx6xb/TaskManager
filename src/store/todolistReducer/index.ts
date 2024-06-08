import * as todolistSelectors from "./selectors"
import { asyncActions, slice } from "./todolistReducer"

const todolistActions = {
  ...asyncActions,
  ...slice.actions,
}

export { todolistSelectors, todolistActions }
