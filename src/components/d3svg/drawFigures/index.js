import DrawBrush from "./brush";
import DrawRect from "./rect";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

function DrawFigures(props) {
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

const getState = (state) => {
  return {
    accordionExpanded: state.mainReducer.dataSpec.accordionExpanded,
  };
};

export default connect(getState)(DrawFigures);
