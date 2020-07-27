import React from "react";
import { connect } from "react-redux";
import fullData from "../../../data";
import "./styles.css";

const Dashboards = (props) => {
  const data = fullData.map((item) => parseInt(item.data.percentComplete.formattedText));
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const average = parseFloat((data.reduce(reducer) / data.length).toFixed(2));
  console.log(average);
  return <div>Hello</div>;
};

const getState = (state) => {
  return {};
};

export default connect(getState)(Dashboards);
