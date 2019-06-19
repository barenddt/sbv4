import { CHANGE_MENU } from "../types";
import { push } from "connected-react-router";
import { history } from "../store/index";

export const changeMenu = e => dispatch => {
  e == "Login" ? history.push(`/`) : history.push(`/${e}`);
  dispatch({
    type: CHANGE_MENU,
    payload: {
      activeTab: e
    }
  });
};
