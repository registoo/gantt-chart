import React from "react";
import { DraggableCore } from "react-draggable";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";
import { handJob } from "../resizedTypes";

// добавляется div для изменения размеров элементов
function ResizePanel(props) {
  // ширина разделитея в пикселях
  const separatorWidth = props.separatorWidth;
  return (
    <div style={{ display: "flex", direction: "row" }}>
      <DraggableCore
        onDrag={function (e, ui) {
          if (!props.widthSVG) return;
          const parentWidth = props.parentDiv.current.offsetWidth;
          const resizableElemWidth = props.widthSVG - ui.deltaX;
          const minSize = props.minWidth;
          if (parentWidth <= minSize * 2 + props.separatorWidth) {
            props.setWidth({
              svgWidth: (parentWidth - props.separatorWidth) / 2,
              resizedType: handJob,
            });
            return;
          }
          if (resizableElemWidth <= minSize) {
            props.setWidth({
              svgWidth: minSize,
              resizedType: handJob,
            });
            return;
          }
          if (resizableElemWidth + separatorWidth >= parentWidth) {
            props.setWidth({
              svgWidth: parentWidth,
              resizedType: handJob,
            });
            return;
          }
          props.setWidth({
            svgWidth: resizableElemWidth,
            resizedType: handJob,
          });
          return;
        }}
      >
        {/* движитель */}
        <div style={{ minWidth: separatorWidth, cursor: "col-resize" }}></div>
      </DraggableCore>
      {props.children}
    </div>
  );
}

const getState = (state) => {
  return {
    widthSVG: state.mainReducer.sizesSVG.width,
    minWidth: state.mainReducer.sizesSVG.minWidth,
    separatorWidth: state.mainReducer.sizesSVG.separatorWidth,
  };
};

export default connect(getState, { setWidth })(ResizePanel);
