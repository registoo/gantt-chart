import React, { Fragment } from "react";
import { connect } from "react-redux";
import keyGenerator from "../../../auxFunctions/keyGenerator.js";
import dataTemplate from "./dataTemplate.js";

function App(props) {
  const data = props.displayedData
    .map((el) => dataTemplate(el.data))
    .map((el, i) => {
      return (
        <Fragment key={keyGenerator()}>
          <div key={keyGenerator()} style={{ border: "1px solid green" }}>
            {props.ids.indexOf(el.workName)}
          </div>
          <div key={keyGenerator()} style={{ wordBreak: "break-all", border: "1px solid green" }}>
            {el.workName}
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
          <div
            key={keyGenerator()}
            onWheel={(e) => e.stopPropagation()}
            style={{ wordBreak: "break-all", overflowY: "scroll", border: "1px solid green" }}
          >
            {el.SPO}
          </div>
          <div key={keyGenerator()} style={{ border: "1px solid green" }}>
            {el.percentComplete}
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
          gridTemplateColumns: `20px 150px 100px 100px repeat(2, minmax(200px, 400px)) 100px 100px`,
          gridTemplateRows: `${props.headerHeight}px repeat(${
            props.currentElementsOnPage
          }, ${props.yScale.bandwidth()}px)`,
          rowGap: `${props.yScale.padding() * props.yScale.step()}px `,
          columnGap: "9px",
        }}
      >
        <div style={{ border: "1px solid red" }}>№</div>
        <div style={{ border: "1px solid red" }}>workName</div>
        <div style={{ border: "1px solid red" }}>start</div>
        <div style={{ border: "1px solid red" }}>finish</div>
        <div style={{ border: "1px solid red" }}>nameRus</div>
        <div style={{ border: "1px solid red" }}>nameEng</div>
        <div style={{ border: "1px solid red" }}>SPO</div>
        <div style={{ border: "1px solid red" }}>percentComplete</div>
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
    currentElementsOnPage: state.mainReducer.dataSpec.currentElementsOnPage,
    displayedData: state.mainReducer.slicedData.displayedData,
    ids: state.mainReducer.ids.fullIds,
    headerHeight: state.mainReducer.sizes.sizesSVG.slider.height,
  };
};

export default connect(getState)(App);
