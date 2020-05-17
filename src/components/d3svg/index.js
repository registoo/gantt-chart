import * as d3 from "d3";
import { connect } from "react-redux";
import ReactFauxDOM from "react-faux-dom";
import { useEffect } from "react";
import drawFigures from "./drawFigures";

function Gantt(props) {
  useEffect(() => {
    console.log("d3 PROPS: ", props);
    drawFigures(props);
  });

  const svg = d3
    .select(ReactFauxDOM.createElement("svg"))
    .attr("height", props.listID.length * 150)
    .attr("viewBox", [0, 0, props.sizesSVG.width, props.sizesSVG.height])
    .attr("id", "chart")
    .call((g) => {
      return props.scales.drawScales(g);
    });

  //с помощью метода toReact (либы react-faux-dom) прикручиваем d3 к React
  return svg.node().toReact();
}
const getState = (state) => {
  return state.mainReducer;
};

export default connect(getState)(Gantt);
