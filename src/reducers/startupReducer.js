import { GRAB_PROXIES } from "../types";

let initialState = {
  proxies: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GRAB_PROXIES:
      state.proxies = action.payload.proxies;
      return { ...state };
    default:
      return { ...state };
  }
}
