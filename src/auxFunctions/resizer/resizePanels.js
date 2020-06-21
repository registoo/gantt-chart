import React from "react";
import { DraggableCore } from "react-draggable";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";

// добавляется div для изменения размеров элементов
function ResizePanel(props) {
  // ширина разделитея в пикселях
  const separatorWidth = 6;
  const brushHandle = 6;
  return (
    <div style={{ display: "flex", direction: "row" }}>
      {props.children}
      <DraggableCore
        onDrag={function (e, ui) {
          const parentWidth = props.parentDiv.current.offsetWidth;
          const resizableElemWidth = props.widthWL + ui.deltaX;
          const minSize = 400;
          if (parentWidth <= minSize * 2 + separatorWidth) {
            props.setWidth({
              svg: (parentWidth - separatorWidth) / 2 - brushHandle,
              wl: (parentWidth - separatorWidth) / 2,
            });
            return;
          }
          if (resizableElemWidth <= minSize) {
            props.setWidth({
              svg: parentWidth - minSize - separatorWidth - brushHandle,
              wl: minSize,
            });
            return;
          }
          if (resizableElemWidth + separatorWidth >= parentWidth - minSize) {
            props.setWidth({
              svg: minSize - brushHandle,
              wl: parentWidth - minSize - separatorWidth,
            });
            return;
          }
          props.setWidth({
            svg: parentWidth - resizableElemWidth - separatorWidth - brushHandle,
            wl: resizableElemWidth,
          });
          return;
        }}
      >
        {/* движитель */}
        <div style={{ minWidth: separatorWidth, cursor: "col-resize" }}></div>
      </DraggableCore>
    </div>
  );
}

const getState = (state) => {
  return { widthWL: state.mainReducer.workList.sizesWL.width };
};

export default connect(getState, { setWidth })(ResizePanel);
