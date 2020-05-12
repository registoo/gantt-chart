import { connect } from "react-redux";
import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";
import scalesFunction from "./scales.js";

function Gantt(props) {
  console.log("d3 PROPS: ", props);

  const scales = scalesFunction({
    scales: props.scales,
    sizesSVG: props.sizesSVG,
    listID: props.listID,
    aux: props.aux,
  });

  const svg = d3
    .select(ReactFauxDOM.createElement("svg"))
    .attr("viewBox", [0, 0, props.sizesSVG.width, props.sizesSVG.height])
    .attr("id", "chart")
    .call((g) => scales.drawScales(g));
  return svg.node().toReact();
}

const getState = (state) => {
  return state.mainReducer;
};

export default connect(getState)(Gantt);
