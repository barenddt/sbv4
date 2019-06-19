import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./store";
const store = configureStore(/* provide initial state if any */);

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

// Now we can render our application into it
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default store;
