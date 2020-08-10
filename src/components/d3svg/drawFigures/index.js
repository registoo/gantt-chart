import DrawBrush from "./brush";
import DrawRect from "./rect";
import React, { Fragment, useState } from "react";

function DrawFigures() {
  const targetPlan = 0.075;

  // otherOnMainWork - это высота brush === 100% минус все дополнительрные рисования сверху
  const [state] = useState({ targetPlan, otherOnMainWork: 1 - targetPlan });
  return (
    <Fragment>
      <DrawRect state={state} />
      <DrawBrush state={state} brushHeight={state.otherOnMainWork} />
    </Fragment>
  );
}

export default DrawFigures;
