import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import InitState from "./InitState";
import * as serviceWorker from "./auxFunctions/serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={history}>
    <CssBaseline>
      <Provider store={store}>
        <InitState />
      </Provider>
    </CssBaseline>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
