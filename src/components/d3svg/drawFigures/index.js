import DrawBrush from "./brush";
import DrawRect from "./rect";
import React, { Fragment } from "react";

export default function (props) {
  return (
    <Fragment>
      <DrawRect />
      <DrawBrush />
    </Fragment>
  );
}
