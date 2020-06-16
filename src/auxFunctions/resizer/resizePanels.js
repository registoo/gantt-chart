import React from "react";
import { DraggableCore } from "react-draggable";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";

// добавляется div для изменения размеров элементов
function ResizePanel(props) {
  // ширина разделитея в пикселях
  const separatorWidth = 5;
  return (
    <div style={{ display: "flex", direction: "row" }}>
      {props.children}
      <DraggableCore
        onDrag={function (e, ui) {
          const parentWidth = props.parentDiv.current.offsetWidth;
          const resizableElemWidth = props.sizesWL.width + ui.deltaX;
          const minSize = 400;
          if (parentWidth <= minSize * 2 + separatorWidth) {
            props.setWidth({ svg: (parentWidth - 5) / 2, wl: (parentWidth - 5) / 2 });
            return;
          }
          if (resizableElemWidth <= minSize) {
            props.setWidth({ svg: parentWidth - minSize - separatorWidth, wl: minSize });
            return;
          }
          if (resizableElemWidth + separatorWidth >= parentWidth - minSize) {
            props.setWidth({ svg: minSize, wl: parentWidth - minSize - separatorWidth });
            return;
          }
          props.setWidth({
            svg: parentWidth - resizableElemWidth - separatorWidth,
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
  return { sizesWL: state.mainReducer.sizesWL };
};

export default connect(getState, { setWidth })(ResizePanel);
