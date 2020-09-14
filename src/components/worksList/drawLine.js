import React from "react";
import keyGenerator from "../../auxFunctions/keyGenerator";
import rowHasError from "../../auxFunctions/rowHasError";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";

export default (
  d,
  ind,
  yScale,
  columns,
  setAccordionExpanded,
  hierarchyFullData,
  accordionExpanded
) => {
  const data = d.data.data;
  const columnsDataAtRow = columns.map((el, i) => {
    const key = el.key;
    const result = {};
    result.d = rowHasError(data)
      ? i === 0
        ? data.isError.formattedText
        : null
      : data[key]
      ? data[key].cellType
        ? data[key].formattedText
        : data[key]
      : data[key];
    result.width = el.width;
    result.leftMargin = el.leftMargin;
    result.fontSize = el.fontSize;
    result.key = key;
    return result;
  });

  const div = (i) => {
    // не рисуем треугольники у ошибок и вложенностей больше 2
    if (d.depth > 1 || rowHasError(data) || i > 0) return null;
    return (
      <foreignObject
        x={0}
        y={Math.round(yScale.paddingOuter() * yScale.step() + yScale.step() * ind)}
        height={yScale.bandwidth()}
        width={24}
        stroke={"red"}
        fill={"yellow"}
      >
        <div
          onClick={() => {
            setAccordionExpanded(accordionExpanded, d, hierarchyFullData);
          }}
        >
          {!accordionExpanded.expanded ? (
            <IconButton size="small">
              <ArrowRightIcon fontSize="inherit" />
            </IconButton>
          ) : (
            <IconButton size="small">
              <ArrowDropDownIcon fontSize="inherit" />
            </IconButton>
          )}
        </div>
      </foreignObject>
    );
  };

  const dataElement = (col) => {
    const result = accordionExpanded.expanded ? (
      <div style={{ fontSize: col.fontSize }}>
        <Input
          onBlur={(e) => {
            const data = d.data.data;
            data[col.key] = e.target.value;
            console.log(data[col.key]);
          }}
          disableUnderline={true}
          defaultValue={col.d ? col.d : null}
        ></Input>
      </div>
    ) : (
      <div style={{ fontSize: col.fontSize }}>{col.d}</div>
    );
    return result;
  };

  const rowCol = columnsDataAtRow.map((col, i) => {
    return (
      <g key={keyGenerator()}>
        {div(i)}
        <rect
          key={keyGenerator()}
          x={col.leftMargin}
          y={Math.round(yScale.paddingOuter() * yScale.step() + yScale.step() * ind)}
          height={yScale.bandwidth()}
          width={col.width}
          stroke={"red"}
          fillOpacity={"0"}
        ></rect>
        <foreignObject
          x={col.leftMargin}
          y={Math.round(yScale.paddingOuter() * yScale.step() + yScale.step() * ind)}
          height={yScale.bandwidth()}
          width={col.width}
        >
          {dataElement(col)}
        </foreignObject>
      </g>
    );
  });

  return <g key={keyGenerator()}>{rowCol}</g>;
};
