import React, { useRef, useEffect } from "react";
import "../../css/resizer.css";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";
import { DraggableCore } from "react-draggable";
import { withResizeDetector } from "react-resize-detector";
import Polzynok from "../../components/polzynok";

function Component(props) {
  const parentDiv = useRef(null);
  const widthSVG = props.widthSVG;
  const setWidth = props.setWidth;
  useEffect(() => {
    setWidth({ svgWidth: widthSVG, parentWidth: parentDiv.current.offsetWidth });
  }, [widthSVG, setWidth]);
  // по дефолту меняется размер второго ребёка
  const [otherELem, resizeElem] = props.children;
  const polzynokTotalWIdth = props.polzynok.width + props.polzynok.margin.left;
  return (
    <div
      ref={parentDiv}
      style={{
        minWidth: props.minWidth + props.separatorWidth + polzynokTotalWIdth,
        display: "flex",
        direction: "row",
      }}
    >
      {otherELem}
      <div style={{ display: "flex", direction: "row" }}>
        <DraggableCore
          onDrag={function (e, ui) {
            if (!widthSVG) return;
            const parentWidth = parentDiv.current.offsetWidth;
            const parentWidthWithTrash = parentWidth - polzynokTotalWIdth;
            const resizableElemWidth = widthSVG - ui.deltaX;
            // если посчитанная ширина меньше или равно минимально разрешённой ширине
            if (resizableElemWidth <= props.minWidth) {
              props.setWidth({ svgWidth: props.minWidth, parentWidth });
            }
            // если посчитанная ширина больше или равно ширины родителя
            else if (resizableElemWidth + props.separatorWidth >= parentWidthWithTrash) {
              props.setWidth({
                svgWidth: parentWidthWithTrash - props.separatorWidth,
                parentWidth,
              });
              return;
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
        <Polzynok />
      </div>
    </div>
  );
}

const getState = (state) => {
  return {
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    minWidth: state.mainReducer.sizes.sizesSVG.minWidth,
    separatorWidth: state.mainReducer.sizes.sizesSVG.separatorWidth,
    polzynok: state.mainReducer.sizes.polzynok,
  };
};

export default connect(getState, { setWidth })(withResizeDetector(Component));
