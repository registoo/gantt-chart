import React from "react";
import DrawAxisX from "./drawAxisX";
import DrawAxisY from "./drawAxisY";

export default function (props) {
  return (
    <g id="gForScales">
      <DrawAxisX />
      <DrawAxisY />
    </g>
  );
}
