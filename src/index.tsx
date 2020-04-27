import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import './assets/styles/global.scss';
import { App } from "./App";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
