import * as appSelectors from "./selectors"
import { slice } from "./appReducer"

const appActions = {
  ...slice.actions,
}

export { appActions, appSelectors }
