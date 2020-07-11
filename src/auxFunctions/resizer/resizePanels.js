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
          const freeWidth = parentWidth - props.sizesLeftMenuWidth;
          const resizableElemWidth = props.widthSVG - ui.deltaX;
          const minSize = props.minWidth;
          if (freeWidth <= minSize * 2 + props.separatorWidth) {
            props.setWidth({
              svgWidth: (freeWidth - props.separatorWidth) / 2,
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
          if (resizableElemWidth + separatorWidth >= freeWidth) {
            props.setWidth({
              svgWidth: freeWidth,
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
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    minWidth: state.mainReducer.sizes.sizesSVG.minWidth,
    separatorWidth: state.mainReducer.sizes.sizesSVG.separatorWidth,
    sizesLeftMenuWidth: state.mainReducer.sizes.sizesLeftMenu.width,
  };
};

export default connect(getState, { setWidth })(ResizePanel);
