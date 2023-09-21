// Combine your reducers here
import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  contacts: contactReducer,
  modal: modalReducer,
});

export default rootReducer;
