import { connect } from "react-redux";
import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";
import scalesFunction from "./scales/index.js";
import { useEffect } from "react";
import rectBrush from "./brush";

function Gantt(props) {
  console.log("d3 PROPS: ", props);

  useEffect(() => {
    const defaultSelection = [50, 150];
    const gOnnerOfRect = d3.selectAll("[id~=Rabota]").append("g");
    gOnnerOfRect.call(d3.brushX()).call(brush.move, [0, 50]);
  });

  const scales = scalesFunction(props);
  const brush = d3.brushX().on("start", () => console.log("brush"));
  const svg = d3
    .select(ReactFauxDOM.createElement("svg"))
    .attr("height", props.listID.length * 150)
    .attr("viewBox", [0, 0, props.sizesSVG.width, props.sizesSVG.height])
    .attr("id", "chart")
    .call((g) => {
      return scales.drawScales(g);
    });
  rectBrush(svg, props, scales);
  //с помощью метода toReact либы react-faux-dom прикручиваем d3 к React
  return svg.node().toReact();
}

const getState = (state) => {
  return state.mainReducer;
};

export default connect(getState)(Gantt);
