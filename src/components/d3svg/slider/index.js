import React, { useCallback, useState, useEffect } from "react";
import * as d3 from "d3";
import { changeXRange } from "../../../redux/mainReducer/action";
import { connect } from "react-redux";
import moment from "moment";
import getScales from "./drawScales.js";

const Slider = (props) => {
  const drawScales = getScales(props);
  const [state, setState] = useState(props.scales.xScale.domain().map(drawScales.xScale));

  useEffect(() => {
    const g = d3.select("#gForSlider");

    const brushed = () => {
      if (!d3.event.sourceEvent) return;
      if (d3.event.sourceEvent.type === "brush") return;

      const d0 = d3.event.selection.map(drawScales.xScale.invert),
        d1 = d0.map(d3.utcDay.round);

      if (d1[0] >= d1[1]) {
        d1[0] = +moment.utc(d3.utcDay.floor(d0[0])).format("x");
        d1[1] = +moment.utc(d3.utcDay.offset(d1[0])).subtract(1, "ms").format("x");
      }
      const result = [
        +moment.utc(d1[0]).format("x"),
        +moment.utc(d1[1]).subtract(1, "ms").format("x"),
      ];

      g.call(d3.event.target.move, result.map(drawScales.xScale));
    };

    const brushended = () => {
      if (!d3.event.selection) {
        g.call(d3.event.target.move, state);
        return;
      }
      if (d3.event.sourceEvent) {
        const s = Date.now();

        setState(d3.event.selection);
        props.changeXRange(
          state.map((el) => +moment.utc(drawScales.xScale.invert(el)).format("x"))
        );
        console.log("timer:", Date.now() - s);
      }
    };

    const brush = d3
      .brushX()
      .extent(drawScales.brushCoordinate)
      .on("brush", function () {
        brushed();
      })
      .on("end", function () {
        brushended();
      });

    g.call(drawScales.xAxis)
      .call(brush)
      .call(brush.move, state)
      .call((g) => {
        g.selectAll(".tick text")
          .attr("font-size", "0.5rem")
          .attr("x", drawScales.pixelsInOneDay / 2);
      })
      .call((g) => {
        g.selectAll(".tick text").attr("display", "block");
      })
      .call((g) => {
        g.selectAll(".tick:last-of-type text").attr("display", "none");
      });
  });

  return (
    <svg
      id="slider"
      width={props.sizesSVG.width}
      height="50px"
      viewBox={[0, 0, props.sizesSVG.width, 50]}
      transform={`translate(${props.sizesSVG.margin.left},${props.sizesSVG.margin.top})`}
    >
      <g id={"gForSlider"}></g>
    </svg>
  );
};

const getState = (state) => {
  return state.mainReducer;
};

export default connect(getState, { changeXRange })(Slider);
