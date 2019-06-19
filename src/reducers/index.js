import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import menuReducer from "../reducers/menuReducer";
import searchReducer from "../reducers/searchReducer";
import taskReducer from "../reducers/taskReducer";
import startupReducer from "../reducers/startupReducer";
import authReducer from "../reducers/authReducer";

export default history =>
  combineReducers({
    menu: menuReducer,
    search: searchReducer,
    task: taskReducer,
    startup: startupReducer,
    auth: authReducer,
    router: connectRouter(history)
  });
