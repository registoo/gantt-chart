import React, { Fragment } from "react";
import { connect } from "react-redux";
import keyGenerator from "../../../auxFunctions/keyGenerator.js";
import dataTemplate from "./dataTemplate.js";

function App(props) {
  const data = props.data
    .map((el) => dataTemplate(el.data))
    .map((el, i) => {
      return (
        <Fragment key={keyGenerator()}>
          <div key={keyGenerator()} style={{ border: "1px solid green" }}>
            {props.ids.indexOf(el.KKS)}
          </div>
          <div key={keyGenerator()} style={{ wordBreak: "break-all", border: "1px solid green" }}>
            {el.KKS}
          </div>
          <div key={keyGenerator()} style={{ border: "1px solid green" }}>
            {el.start}
          </div>
          <div key={keyGenerator()} style={{ border: "1px solid green" }}>
            {el.finish}
          </div>
          <div
            key={keyGenerator()}
            style={{ overflowY: "scroll", border: "1px solid green" }}
            className="elem"
          >
            {el.nameRus}
          </div>
          <div
            key={keyGenerator()}
            style={{ overflowY: "scroll", border: "1px solid green" }}
            onWheel={(e) => e.stopPropagation()}
            className="elem"
          >
            {el.nameEng}
          </div>
        </Fragment>
      );
    });

  const Tables = () => {
    return (
      <div
        className="WLContainer"
        style={{
          display: "grid",
          gridTemplateColumns: `20px 150px 100px 100px repeat(2, minmax(200px, 400px))`,
          gridTemplateRows: `${props.headerHeight}px repeat(${
            props.elementsOnPage
          }, ${props.yScale.bandwidth()}px)`,
          rowGap: `${props.yScale.padding() * props.yScale.step()}px `,
          columnGap: "9px",
        }}
      >
        <div style={{ border: "1px solid red" }}>№</div>
        <div style={{ border: "1px solid red" }}>KKS</div>
        <div style={{ border: "1px solid red" }}>start</div>
        <div style={{ border: "1px solid red" }}>finish</div>
        <div style={{ border: "1px solid red" }}>nameRus</div>
        <div style={{ border: "1px solid red" }}>nameEng</div>
        {data}
      </div>
    );
  };
  return (
    <div>
      <Tables />
    </div>
  );
}

const getState = (state) => {
  return {
    yScale: state.mainReducer.scales.yScale,
    elementsOnPage: state.mainReducer.dataSpec.elementsOnPage,
    data: state.mainReducer.dataDisplayed,
    ids: state.mainReducer.ids.totalListOfID,
    headerHeight: state.mainReducer.sizesSVG.slider.height,
  };
};

export default connect(getState)(App);
