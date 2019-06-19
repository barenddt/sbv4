import { SEARCH_SONGS, SELECT_SONG } from "../types";
import axios from "axios";
import config from "../config";
import { history } from "../store/index";

export const searchSongs = e => dispatch => {
  axios.get(`${config.url}/api/search/tracks/${e}`).then(result => {
    dispatch({
      type: SEARCH_SONGS,
      payload: {
        results: result.data
      }
    });
  });
};

export const selectSong = e => dispatch => {
  dispatch({
    type: SELECT_SONG,
    payload: {
      selected: e
    }
  });
  history.push("/create");
};
