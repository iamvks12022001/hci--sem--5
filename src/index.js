import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers";
import { Provider } from "react-redux";

const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //middleware code
    if (typeof action !== "function") {
      console.log("1st middleware Action Tpe = ", action.type);
    }
    next(action);
  };

const store = createStore(combineReducers, applyMiddleware(logger, thunk));
console.log("store", store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
