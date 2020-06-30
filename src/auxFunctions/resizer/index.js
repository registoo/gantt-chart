import React, { useEffect, useRef } from "react";
import { withResizeDetector } from "react-resize-detector";
import Resize from "./resizePanels";
import "../../css/resizer.css";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";
import { handJob, defaultResizer } from "../resizedTypes.js";

function CustomComponent(props) {
  const parentDiv = useRef(null);

  // ищем компонент с resize=true
  const resizeElem = props.children.filter((e) => {
    if (e.props.resize) return e;
    return null;
  });
  const otherELems = props.children.filter((e) => {
    if (!e.props.resize) return e;
    return null;
  });

  // сброс ширин на дефолтные при изменении размера окна
  useEffect(() => {
    if (!props.width) {
      return;
    }
    if (props.resizedType === handJob) {
      return;
    }
    const currentWidth = (+props.width - 2) / 2;
    props.setWidth({ svgWidth: currentWidth - 6, resizedType: defaultResizer });
    return;
  }, [props]);

  return (
    <div
      className="resizerBody"
      ref={parentDiv}
      style={{ minWidth: `${props.minWidth * 2 + props.separatorWidth}px` }}
    >
      {otherELems}
      <Resize parentDiv={parentDiv}>{resizeElem}</Resize>
    </div>
  );
}

const getState = (state) => {
  return {
    width: state.mainReducer.sizesSVG.width,
    resizedType: state.mainReducer.sizesSVG.resizedType,
    separatorWidth: state.mainReducer.sizesSVG.separatorWidth,
  };
};

export default connect(getState, { setWidth })(withResizeDetector(CustomComponent));
