import { connect } from "react-redux";
import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";
import scalesFunction from "./scales/index.js";
import { useEffect } from "react";
import rowHasError from "../../auxFunctions/rowHasError";

function Gantt(props) {
  console.log("d3 PROPS: ", props);

  useEffect(() => {
    d3.selectAll("rect").on("drag", () => console.log(d3.event));
  });

  const scales = scalesFunction(props);
  const svg = d3
    .select(ReactFauxDOM.createElement("svg"))
    .attr("height", props.listID.length * 150)
    .attr("viewBox", [0, 0, props.sizesSVG.width, props.sizesSVG.height])
    .attr("id", "chart")
    .call((g) => scales.drawScales(g));
  svg
    .selectAll()
    .data(props.data)
    .enter()
    .append("rect")
    .attr("y", (d) => {
      return rowHasError(d.data)
        ? scales.yScale(d.data.isError.formattedText)
        : scales.yScale(d.data.jobName.formattedText);
    })
    .attr("x", (d) => {
      if (!rowHasError(d.data)) {
        return scales.xScale(d.data.start.dateInMillisecons);
      }
    })
    .attr("height", scales.yScale.bandwidth())
    .attr("width", (d) => {
      if (!rowHasError(d.data)) {
        return (
          scales.xScale(d.data.start.dateInMillisecons + (d.data.duration * 86400000 - 1)) -
          scales.xScale(d.data.start.dateInMillisecons)
        );
      }
    })
    .style("fill", "steelblue")
    .attr("id", (d) => (rowHasError(d.data) ? null : d.data.jobName.formattedText));
  //с помощью метода toReact либы react-faux-dom прикручиваем d3 к React
  return svg.node().toReact();
}

const getState = (state) => {
  return state.mainReducer;
};

export default connect(getState)(Gantt);
