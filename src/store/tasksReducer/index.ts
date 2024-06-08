import * as tasksSelectors from "./selectors"
import { asyncActions, slice } from "./tasksReducer"

const tasksActions = {
  ...asyncActions,
  ...slice.actions,
}

export { tasksActions, tasksSelectors }
