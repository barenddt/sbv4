import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "../types";

let initialState = {
  authenticated: false,
  user: null,
  msg: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      state.authenticated = action.payload.authenticated;
      state.user = action.payload.user;
      state.msg = action.payload.msg;
      return { ...state };
    case LOGOUT_USER:
      state.authenticated = false;
      state.user = null;
      return { ...state };
    case UPDATE_USER:
      state.user = action.payload.user;
      return { ...state };
    default:
      return { ...state };
  }
}
