import { CREATE_TASK, UPDATE_TASK } from "../types";

let initialState = {
  tasks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      state.tasks.push(action.payload.task);
      return { ...state };
    case UPDATE_TASK:
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id == action.payload.task.track.id) {
          state.tasks[i].currentPlays = action.payload.state.currentPlays;
        }
      }
      return { ...state };
    default:
      return { ...state };
  }
}
