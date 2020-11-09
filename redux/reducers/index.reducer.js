import { combineReducers } from "redux";

import themeReducer from "./theme.reducer";
import admobReducer from "./admob.reducer";
export default combineReducers({
  themeReducer,
  admobReducer,
});
