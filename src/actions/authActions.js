import { LOGIN_USER, LOGOUT_USER, CHANGE_MENU, UPDATE_USER } from "../types";
import { history } from "../store/index";
import config from "../config";
import Axios from "axios";

export const loginUser = e => dispatch => {
  Axios.post(`${config.url}/api/auth/login`, e).then(result => {
    if (result.data.success) {
      dispatch({
        type: LOGIN_USER,
        payload: {
          authenticated: true,
          user: result.data.user,
          msg: null
        }
      });
      dispatch({
        type: CHANGE_MENU,
        payload: {
          activeTab: "Search"
        }
      });
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      localStorage.setItem("loginInfo", JSON.stringify(e));
      history.push("/search");
    } else {
      dispatch({
        type: LOGIN_USER,
        payload: {
          authenticated: false,
          user: null,
          msg: result.data.msg
        }
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("loginInfo");
    }
  });
};

export const updateUser = e => dispatch => {
  Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "token"
  );
  let user = JSON.parse(localStorage.getItem("user"));
  Axios.post(`${config.url}/api/actions/update/user`, {
    username: user.username
  }).then(result => {
    if (result.data.success) {
      dispatch({
        type: UPDATE_USER,
        payload: {
          user: result.data.user
        }
      });
    } else {
      dispatch({
        type: UPDATE_USER,
        payload: {
          user: result.data.user
        }
      });
    }
  });
};

export const logoutUser = e => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });
  dispatch({
    type: CHANGE_MENU,
    payload: {
      activeTab: "Login"
    }
  });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("loginInfo");
  history.push("/login");
};
