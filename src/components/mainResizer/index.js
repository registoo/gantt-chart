import React, { useRef, useEffect } from "react";
import "../../css/resizer.css";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";
import { DraggableCore } from "react-draggable";
import { withResizeDetector } from "react-resize-detector";

function CustomComponent(props) {
  const parentDiv = useRef(null);
  useEffect(() => {
    props.setWidth({ svgWidth: props.widthSVG, parentWidth: parentDiv.current.offsetWidth });
  });
  // по дефолту меняется размер второго ребёка
  const [otherELem, resizeElem] = props.children;

  return (
    <div
      ref={parentDiv}
      style={{ minWidth: props.minWidth + props.separatorWidth }}
      style={{ display: "flex", direction: "row" }}
    >
      {otherELem}
      <div style={{ display: "flex", direction: "row" }}>
        <DraggableCore
          onDrag={function (e, ui) {
            if (!props.widthSVG) return;
            const parentWidth = parentDiv.current.offsetWidth;
            const resizableElemWidth = props.widthSVG - ui.deltaX;
            // если посчитанная ширина меньше или равно минимально разрешённой ширине
            if (resizableElemWidth <= props.minWidth) {
              props.setWidth({ svgWidth: props.minWidth, parentWidth });
            }
            // если посчитанная ширина больше или равно ширины родителя
            else if (resizableElemWidth + props.separatorWidth >= parentWidth) {
              props.setWidth({ svgWidth: parentWidth, parentWidth });
            }
            // просто изменение ширины
            else {
              props.setWidth({ svgWidth: resizableElemWidth, parentWidth });
            }
          }}
        >
          {/* движитель */}
          <div style={{ minWidth: props.separatorWidth, cursor: "col-resize" }}></div>
        </DraggableCore>
        {resizeElem}
      </div>
    </div>
  );
}

const getState = (state) => {
  return {
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    minWidth: state.mainReducer.sizes.sizesSVG.minWidth,
    separatorWidth: state.mainReducer.sizes.sizesSVG.separatorWidth,
  };
};

export default connect(getState, { setWidth })(withResizeDetector(CustomComponent));
