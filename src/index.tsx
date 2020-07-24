import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import App from "./app";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
      Hello
    <App />
  </Provider>,
  document.getElementById("root")
);
