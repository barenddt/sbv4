import { CHANGE_MENU } from "../types";

let initialState = {
  activeTab: "Login",
  items: [
    { name: "Search", icon: "fe fe-search" },
    { name: "Tasks", icon: "fe fe-layers" },
    { name: "Settings", icon: "fe fe-settings" }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MENU:
      state.activeTab = action.payload.activeTab;
      return { ...state };
    default:
      return { ...state };
  }
}
