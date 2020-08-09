import { keyGenerator, rowHasError } from "../../../../auxFunctions/index.js";
import React from "react";
import { connect } from "react-redux";

const DrawRect = (props) => {
  const x = (d) => props.xScale(d.start.dateInMillisecons);
  const y = (data, id) =>
    rowHasError(data) ? props.yScale(data.isError.formattedText) : props.yScale(id);
  const height = (d, h) => props.yScale.bandwidth() * (h ? h : props.state.targetPlan);
  const width = (d) =>
    props.xScale(d.start.dateInMillisecons + (d.duration * 86400000 - 1)) -
    props.xScale(d.start.dateInMillisecons);

  const id = (d) => `Rabota ${d.id} rect`;

  let arrMain = [];
  let arrLvl4 = [];
  // если раскрыто, рисуем план только для верхней строчки, т.к. он - родитель
  if (props.accordionExpanded) {
    arrMain = [...props.hierarchyDisplayedData].map((d0, index) => {
      const d = d0.data;
      if (rowHasError(d.data)) return <rect y={y(d.data)} key={keyGenerator(d.id)}></rect>;
      if (index > 0) {
        // для работ графика 4 уровня
        // если есть браш у работы, то рисуем прямоугольник
        if (d.data.start && d.data.finish) {
          return (
            <rect
              key={keyGenerator(d.id)}
              x={x(d.data)}
              y={y(d.data, d.id)}
              height={height(d.data, 1)}
              width={width(d.data)}
              id={id(d)}
            ></rect>
          );
        }
        return null;
      }
      return (
        <rect
          key={keyGenerator(d.id)}
          x={x(d.data)}
          y={y(d.data, d.id)}
          height={height(d.data)}
          width={width(d.data)}
          id={id(d)}
        ></rect>
      );
    });
  }
  // иначе рисуем базовый план для главной страницы
  else {
    arrMain = [...props.hierarchyDisplayedData].map((d0) => {
      const d = d0.data;
      if (rowHasError(d.data)) return <rect y={y(d.data)} key={keyGenerator(d.id)}></rect>;
      return (
        <rect
          key={keyGenerator(d.id)}
          x={x(d.data)}
          y={y(d.data, d.id)}
          height={height(d.data)}
          width={width(d.data)}
          id={id(d)}
        ></rect>
      );
    });
  }

  return (
    <g id="gForRects" transform={`translate(${props.marginSVG.left},${props.marginSVG.top})`}>
      {arrMain}
      {arrLvl4}
    </g>
  );
};

const getState = (state) => {
  return {
    xScale: state.mainReducer.scales.xScale,
    yScale: state.mainReducer.scales.yScale,
    hierarchyDisplayedData: state.mainReducer.slicedData.hierarchyDisplayedData,
    marginSVG: state.mainReducer.sizes.sizesSVG.margin,
    lvl4: state.mainReducer.slicedData.lvl4,
    accordionExpanded: state.mainReducer.dataSpec.accordionExpanded,
  };
};

export default connect(getState)(DrawRect);
