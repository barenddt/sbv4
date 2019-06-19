import { SEARCH_SONGS, SELECT_SONG } from "../types";

let initialState = {
  results: null,
  selected: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SONGS:
      state.results = action.payload.results;
      return { ...state };
    case SELECT_SONG:
      state.selected = action.payload.selected;
      return { ...state };
    default:
      return { ...state };
  }
}
