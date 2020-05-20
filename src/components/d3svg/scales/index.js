import React, { Fragment } from "react";
import DrawAxisX from "./drawAxisX";
import DrawAxisY from "./drawAxisY";

export default function (props) {
  return (
    <Fragment>
      <DrawAxisX {...props}></DrawAxisX>
      <DrawAxisY {...props}></DrawAxisY>
    </Fragment>
  );
}
