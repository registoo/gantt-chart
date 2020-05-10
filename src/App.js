import React, { Fragment } from "react";
import { connect } from "react-redux";
import D3svg from "./components/d3svg";
import * as d3 from "d3";

function App(props) {
  return (
    <Fragment>
      <D3svg></D3svg>
    </Fragment>
  );
}
const getState = (state) => {
  const arr = d3.entries(state.mainReducer.data);
  console.log(arr);
  return state;
};

export default connect(getState)(App);
