import keyGenerator from "../../auxFunctions/keyGenerator";
import React from "react";

export default (columns, heihgt) => {
  const a = columns.map((el) => {
    const d = el.d;
    const width = el.width;
    const x = el.leftMargin;
    return (
      <g key={keyGenerator()}>
        <rect
          key={keyGenerator()}
          x={x}
          height={heihgt}
          width={width}
          stroke={"green"}
          fillOpacity={"0"}
        ></rect>
        <foreignObject x={x} height={heihgt} width={width}>
          <div style={{ fontWeight: "bold" }}>{d}</div>
        </foreignObject>
      </g>
    );
  });
  return a;
};
