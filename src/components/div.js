import React, { useEffect, useState, Fragment, useRef, useCallback } from "react";

export default function ShowWindowDimensions(props) {
  const [widthS, setWidth] = useState(100);
  const resizeRef = useRef(null);

  return (
    <Fragment>
      <div
        style={{ border: "1px solid black", width: widthS, height: 100, resize: "both" }}
        ref={resizeRef}
      >
        width:
      </div>
    </Fragment>
  );
}
