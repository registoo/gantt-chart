import { withStyles } from "@material-ui/core/styles";
import React from "react";
import Slider from "@material-ui/core/Slider";
import { connect } from "react-redux";

const Polzynok = (props) => {
  return (
    <div style={{ paddingTop: 50 }}>
      <AppgradedPolzynok
        orientation="vertical"
        max={0}
        min={(props.dataLength - props.elementsOnPage) * -1}
        defaultValue={props.start * -1}
        component="div"
        style={{ paddingLeft: 0, paddingRight: 1 }}
        track="inverted"
        value={props.start * -1}
      />
    </div>
  );
};

const AppgradedPolzynok = withStyles({
  // убрана круглая штучка со слайдера
  thumb: {
    height: 0,
    width: 0,
  },
})(Slider);

const getState = (state) => {
  return {
    dataLength: state.mainReducer.ids.totalListOfID.length,
    elementsOnPage: state.mainReducer.dataSpec.elementsOnPage,
    start: state.mainReducer.dataSpec.dataRange.start,
  };
};

export default connect(getState)(Polzynok);
