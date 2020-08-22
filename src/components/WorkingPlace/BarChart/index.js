import React, { useCallback } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import "./styles.css";
import { keyGenerator } from "../../../auxFunctions/index.js";

const data = [
  {
    "1": 24,
    "2": 294,
    "3": 594,
    "4": 1927,
    "5": 376,
    Question: "Question 1test ",
    N: 3215,
  },
  {
    "1": 2,
    "2": 2,
    "3": 0,
    "4": 7,
    "5": 0,
    Question: "Questqwdqwewqewion 21111111111111",
    N: 11,
  },
  {
    "1": 2,
    "2": 0,
    "3": 2,
    "4": 4,
    "5": 2,
    Question: "Question 33333333333",
    N: 10,
  },
  {
    "1": 0,
    "2": 2,
    "3": 1,
    "4": 7,
    "5": 6,
    Question: "Question 4",
    N: 16,
  },
  {
    "1": 0,
    "2": 1,
    "3": 3,
    "4": 16,
    "5": 4,
    Question: "Question 5",
    N: 24,
  },
  {
    "1": 1,
    "2": 1,
    "3": 2,
    "4": 9,
    "5": 3,
    Question: "Question 6",
    N: 16,
  },
  {
    "1": 0,
    "2": 0,
    "3": 1,
    "4": 4,
    "5": 0,
    Question: "Question 7",
    N: 5,
  },
  {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 2,
    Question: "Question 8",
    N: 2,
  },
  {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 2,
    Question: "Question 9",
    N: 2,
  },
  {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 2,
    Question: "Question 10",
    N: 2,
  },
  {
    "1": 0,
    "2": 0,
    "3": 1,
    "4": 4,
    "5": 0,
    Question: "Question 11",
    N: 5,
  },
  {
    "1": 200,
    "2": 100,
    "3": 0,
    "4": 400,
    "5": 250,
    Question: "Question 12",
    N: 950,
  },
];

const BarChart = (props) => {
  const filteredData = props.filteredData;
  console.log(filteredData);
  const colors = ["#d53e4f", "#fc8d59", "#fee08b", "#e6f598", "#99d594", "#3288bd"];
  const colorsTitle = ["Потрачено", "Почти потрачено", "Нуу вроде норм", "Ок", "Опережаем график"];

  const svg = useCallback(
    (node) => {
      if (node !== null) {
        const margin = { top: 0, right: 20, bottom: 10, left: 65 },
          width = 800 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        const y = d3.scaleBand().rangeRound([0, height]).padding(0.05);

        const x = d3.scaleLinear().rangeRound([0, width]);

        const color = d3.scaleOrdinal().range(colors);

        const xAxis = d3.axisTop(x);

        const yAxis = d3.axisLeft(y);

        const svg = d3
          .select("#BarChart")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        color.domain(["0-20%", "20-40%", "40-60%", "60-80%", "80-100%"]);

        data.map((d) => {
          console.log(d);
          // calc percentages
          d["0-20%"] = (+d[1] * 100) / d.N;
          d["20-40%"] = (+d[2] * 100) / d.N;
          d["40-60%"] = (+d[3] * 100) / d.N;
          d["60-80%"] = (+d[4] * 100) / d.N;
          d["80-100%"] = (+d[5] * 100) / d.N;
          let x0 = -1 * (d["40-60%"] / 2 + d["20-40%"] + d["0-20%"]);
          let idx = 0;
          return (d.boxes = color.domain().map(function (name) {
            return { name: name, x0: x0, x1: (x0 += +d[name]), N: +d.N, n: +d[(idx += 1)] };
          }));
        });

        const min_val = d3.min(data, function (d) {
          return d.boxes["0"].x0;
        });

        const max_val = d3.max(data, function (d) {
          return d.boxes["4"].x1;
        });

        x.domain([min_val, max_val]).nice();
        y.domain(
          data.map(function (d) {
            return d.Question;
          })
        );

        svg.append("g").attr("class", "x axis").call(xAxis);

        svg
          .append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .selectAll(".tick")
          .append("title")
          .text((d) => d);

        const vakken = svg
          .selectAll(".question")
          .data(data)
          .enter()
          .append("g")
          .attr("class", "bar")
          .attr("transform", function (d) {
            return "translate(0," + y(d.Question) + ")";
          });

        const bars = vakken
          .selectAll("rect")
          .data(function (d) {
            return d.boxes;
          })
          .enter()
          .append("g")
          .attr("class", "subbar");

        bars
          .append("rect")
          .attr("height", y.bandwidth())
          .attr("x", function (d) {
            return x(d.x0);
          })
          .attr("width", function (d) {
            return x(d.x1) - x(d.x0);
          })
          .style("fill", function (d) {
            return color(d.name);
          })
          .append("title")
          .text((d) => d.n);

        //   bars
        //     .append("text")
        //     .attr("x", function (d) {
        //       return x(d.x0);
        //     })
        //     .attr("y", y.bandwidth() / 2)
        //     .attr("dy", "0.5em")
        //     .attr("dx", "0.5em")
        //     .style("font", "10px sans-serif")
        //     .style("text-anchor", "begin")
        //     .text(function (d) {
        //       return d.n !== 0 && d.x1 - d.x0 > 3 ? d.n : "";
        //     });

        vakken
          .insert("rect", ":first-child")
          .attr("height", y.bandwidth())
          .attr("x", "1")
          .attr("width", width)
          .attr("fill-opacity", "0.5")
          .style("fill", "#F5F5F5")
          .attr("class", function (d, index) {
            return index % 2 === 0 ? "even" : "uneven";
          });

        svg
          .append("g")
          .attr("class", "y axis")
          .append("line")
          .attr("x1", x(0))
          .attr("x2", x(0))
          .attr("y2", height);

        //   const startp = svg.append("g").attr("class", "legendbox").attr("id", "mylegendbox");
        //   // this is not nice, we should calculate the bounding box and use that
        //   const legend_tabs = [0, 120, 200, 375, 450];
        //   const legend = startp
        //     .selectAll(".legend")
        //     .data(color.domain().slice())
        //     .enter()
        //     .append("g")
        //     .attr("class", "legend")
        //     .attr("transform", function (d, i) {
        //       return "translate(" + legend_tabs[i] + ",-45)";
        //     });

        //   legend.append("rect").attr("x", 0).attr("width", 18).attr("height", 18).style("fill", color);

        //   legend
        //     .append("text")
        //     .attr("x", 22)
        //     .attr("class", "legend")
        //     .attr("y", 9)
        //     .attr("dy", ".35em")
        //     .style("text-anchor", "begin")
        //     .style("font", "10px sans-serif")
        //     .text(function (d) {
        //       return d;
        //     });

        //   d3.selectAll(".axis path")
        //     .style("fill", "none")
        //     .style("stroke", "#000")
        //     .style("shape-rendering", "crispEdges");

        //   d3.selectAll(".axis line")
        //     .style("fill", "none")
        //     .style("stroke", "#000")
        //     .style("shape-rendering", "crispEdges");

        //   const movesize = width / 2 - startp.node().getBBox().width / 2;
        //   d3.selectAll(".legendbox").attr("transform", "translate(" + movesize + ",0)");
      }
    },
    [colors]
  );
  return (
    <div className="bar-chart__box">
      <div className="color-title__box">
        {colorsTitle.map((title, index) => {
          return (
            <span key={keyGenerator()} className="color-title">
              <span
                className="color-title__square"
                style={{ backgroundColor: colors[index] }}
              ></span>
              {title}
            </span>
          );
        })}
      </div>
      <svg id="BarChart" ref={svg}></svg>
    </div>
  );
};

const getState = (state) => {
  return {
    filteredData: state.mainReducer.slicedData.hierarchyDisplayedData,
  };
};

export default connect(getState)(BarChart);
