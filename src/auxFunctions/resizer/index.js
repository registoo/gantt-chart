import React, { useEffect, useRef } from "react";
import { withResizeDetector } from "react-resize-detector";
import Resize from "./resizePanels";
import "../../css/resizer.css";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";

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
    if (!props.width) return;
    const currentWidth = (+props.width - 2) / 2;
    props.setWidth({ svg: currentWidth - 6, wl: currentWidth });
  }, [props]);

  return (
    <div className="resizerBody" ref={parentDiv}>
      <Resize parentDiv={parentDiv}>{resizeElem}</Resize>
      {otherELems}
    </div>
  );
}

export default connect(null, { setWidth })(withResizeDetector(CustomComponent));
