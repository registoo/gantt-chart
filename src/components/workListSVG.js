import React, { useCallback, useRef } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

const F = (props) => {
  const divRef = useRef(null);
  const height = (i) => {
    console.log(
      props.yScale.padding() * props.yScale.step(),
      props.yScale.padding(),
      props.yScale.step(),
      props.yScale.bandwidth()
    );
    return props.yScale.bandwidth() * i;
  };
  const width = "100%";
  const addSomething = useCallback(
    (node) => {
      const div = divRef.current ? divRef.current : "div";
      if (node !== null) {
        const svg = d3.select(node);
        let i = 0;
        while (i < 100) {
          svg
            .append("text")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .text(`getScrollbarWidth(svg)`)
            .attr("y", () => height(i))
            .attr("x", 150)
            .attr("dy", "10px")
            .on("click", () => console.log("click"));
          //   svg
          //     .append("line")
          //     .attr("x1", 0)
          //     .attr("y1", () => height(i))
          //     .attr("x2", 150)
          //     .attr("y2", () => height(i))
          //     .attr("heigth", 2)
          //     .attr("stroke", "black");
          svg
            .append("rect")
            .attr("x", 20)
            .attr("y", props.yScale.step() * i)
            .attr("height", props.yScale.bandwidth())
            .attr("width", 100)
            .attr("stroke", "green")
            .attr("fillOpacity", 0.4);
          i += 1;
        }
      }
    },
    [props]
  );
  return (
    <div
      ref={divRef}
      style={{
        marginTop: props.ganttTopScaleHeight * 2 + props.yScale.padding() * props.yScale.step(),
        overflowX: "scroll",
        overflowY: "hidden",
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        width: 0,
      }}
    >
      <svg
        ref={addSomething}
        style={{
          width: "1000",
          height: "100%",
        }}
      >
        {/* <rect width="100%" height="100%" fill="red" /> */}
        {/* <rect width="100%" height="50px" fill="green" x={10} y={10} /> */}
      </svg>
    </div>
  );
};

const getState = (state) => {
  console.log(state.mainReducer);
  return {
    displayedData: state.mainReducer.slicedData.displayedData,
    ganttTopScaleHeight: state.mainReducer.sizes.sizesSVG.ganttTopScale.height,
    yScale: state.mainReducer.scales.yScale,
  };
};

export default connect(getState)(F);

const columns = [
  {
    label: "Size",
    value: (d) => d.value,
    // format,
    x: 280,
  },
  {
    label: "Count",
    value: (d) => (d.children ? 0 : 1),
    // format: (value, d) => (d.children ? format(value) : "-"),
    x: 340,
  },
];

// for (const { label, value, format, x } of columns) {
//   svg
//     .append("text")
//     .attr("dy", "0.32em")
//     .attr("y", -nodeSize)
//     .attr("x", x)
//     .attr("text-anchor", "end")
//     .attr("font-weight", "bold")
//     .text(label);

//   node
//     .append("text")
//     .attr("dy", "0.32em")
//     .attr("x", x)
//     .attr("text-anchor", "end")
//     .attr("fill", (d) => (d.children ? null : "#555"))
//     .data(root.copy().sum(value).descendants())
//     .text((d) => format(d.value, d));
// }
