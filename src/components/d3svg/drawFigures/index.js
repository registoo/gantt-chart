import DrawBrush from "./brush";
import DrawRect from "./rect";
import React, { Fragment } from "react";

export default function (props) {
  const G = (props) => {
    return (
      <g id={props.attrId} transform={`translate(${props.margin.left},${props.margin.top})`}>
        {props.children}
      </g>
    );
  };

  return (
    <Fragment>
      <G attrId="gForRects" margin={props.sizesSVG.margin}>
        <DrawRect {...props}></DrawRect>
      </G>
      <G attrId="gForBrushing" margin={props.sizesSVG.margin}>
        <DrawBrush {...props}></DrawBrush>
      </G>
    </Fragment>
  );
}
