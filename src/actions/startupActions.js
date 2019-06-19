import { GRAB_PROXIES } from "../types/index";
import Axios from "axios";

export const grabProxies = () => dispatch => {
  Axios.get("https://soundbolt.me/proxies").then(result => {
    dispatch({
      type: GRAB_PROXIES,
      payload: {
        proxies: result.data
      }
    });
  });
};
