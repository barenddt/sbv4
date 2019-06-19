import { CREATE_TASK, CHANGE_MENU, UPDATE_USER, UPDATE_TASK } from "../types";
import { history } from "../store/index";
import Axios from "axios";
import config from "../config";
import store from "../index";
import moment from "moment";
import rp from "request-promise";

export const createTask = e => dispatch => {
  Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "token"
  );
  Axios.post(`${config.url}/api/actions/update/credits`, {
    username: store.getState().auth.user.username,
    credits: e.state.plays
  }).then(result => {
    if (result.data.success) {
      dispatch({
        type: CREATE_TASK,
        payload: {
          task: e
        }
      });
      dispatch({
        type: CHANGE_MENU,
        payload: {
          activeTab: "Tasks"
        }
      });
      dispatch({
        type: UPDATE_USER,
        payload: {
          user: result.data.user
        }
      });
      task(e, plays => {
        e.state.currentPlays = plays;
        if (e.state.currentPlays <= e.state.plays) {
          dispatch({
            type: UPDATE_TASK,
            payload: {
              task: e
            }
          });
        }
      });
      history.push("/tasks");
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

const task = (e, next) => {
  let proxies;

  switch (e.state.proxies) {
    case "SoundBolt Proxies":
      proxies = store.getState().startup.proxies;
      break;
    case "User Proxies":
      proxies = store.getState().startup.proxies;
      break;
    default:
      proxies = store.getState().startup.proxies;
      break;
  }

  let threads = 300;
  let playsdone = 0;
  let running = 100;
  let sleeping = 0;
  const split = (proxies.length / threads).toFixed(0);

  for (let i = 1; i <= threads; i++) {
    loop(split, i, () => {
      console.log(`Thread ${i} done.`);
    });
  }

  let user =
    (Math.random() * (999999 - 100000) + 100000).toFixed(0) +
    "-" +
    (Math.random() * (999999 - 100000) + 100000).toFixed(0) +
    "-" +
    (Math.random() * (999999 - 100000) + 100000).toFixed(0) +
    "-" +
    (Math.random() * (999999 - 100000) + 100000).toFixed(0);

  async function loop(split, thread, done) {
    let abort = false;

    for (
      let y = split * thread - split;
      y <= split * thread && playsdone <= e.state.plays && !abort;
      y++
    ) {
      let ip_port = proxies[y].split(":");

      // let deletedTasks = store.getState().task.deletedTasks;

      // for (let i = 0; i <= deletedTasks.length; i++) {
      //   if (e.song.id == deletedTasks[i]) {
      //     abort = true;
      //   }
      // }

      let content = {
        events: [
          {
            event: "audio",
            version: "v1.27.17",
            payload: {
              page_name: "classic:tracks",
              page_urn: "soundcloud:tracks:" + e.track.id,
              track_length: e.track.full_duration,
              player_type: "MaestroHLSMSE",
              action: "play",
              trigger: "manual",
              policy: "ALLOW",
              referrer: "https://soundcloud.com/",
              monetization_model: "NOT_APPLICABLE",
              track: "soundcloud:tracks:" + e.track.id,
              track_owner: "soundcloud:users:" + e.track.user.id,
              playhead_position: 5,
              anonymous_id:
                (Math.random() * (999999 - 100000) + 100000).toFixed(0) +
                "-" +
                (Math.random() * (999999 - 100000) + 100000).toFixed(0) +
                "-" +
                (Math.random() * (999999 - 100000) + 100000).toFixed(0) +
                "-" +
                (Math.random() * (999999 - 100000) + 100000).toFixed(0),
              client_id: 46941,
              ts: moment().valueOf(),
              url: e.track.permalink_url,
              app_version: "1560330355",
              part_of_variants: "0"
            }
          }
        ]
      };

      let options = {
        method: "POST",
        uri: "https://l9bjkkhaycw6f8f4.soundcloud.com/v1/events",
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-GB,en-US;q=0.8,en;q=0.6",
          Connection: "keep-alive",
          "Content-Length": 1461,
          "Content-Type": "text/plain;charset=UTF-8",
          Host: "l9bjkkhaycw6f8f4.soundcloud.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
        },
        proxy: `http://${ip_port[0]}:${ip_port[1]}`,
        body: JSON.stringify(content),
        timeout: 6000
      };

      await new Promise(resolve => {
        rp(options)
          .then(() => {
            playsdone++;
            next(playsdone);
            resolve();
          })
          .catch(err => {
            resolve();
          });
      });
    }

    if (playsdone <= e.state.plays) {
      console.log("Thread sleeping.");
      sleeping++;
      running--;
      setTimeout(() => {
        console.log("Thread starting.");
        sleeping--;
        running++;
        loop(split, thread);
      }, 15 * 60000);
    }
  }
};
