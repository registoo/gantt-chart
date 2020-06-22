import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import keyGenerator from "../../../auxFunctions/keyGenerator.js";
import { Table } from "evergreen-ui";
import dataTemplate from "./dataTemplate.js";
import { setSelectedData } from "../../../redux/mainReducer/action";
import { TransitionGroup } from "react-transition-group";

function App(props) {
  const ref1 = useRef(null);
  const rows = props.data.map((el) => dataTemplate(el.data));
  const stateStart = props.dataSpec.dataRange.start;
  const stateFinish = props.dataSpec.dataRange.finish;

  function ee(e) {
    const wDelta = e.wheelDelta < 0 ? "down" : "up";
    switch (wDelta) {
      case "down": {
        const finish = stateFinish + 1 >= props.ids.length ? props.ids.length : stateFinish + 1;
        const start = finish - props.dataSpec.elementsOnPage;
        props.setSelectedData({ start: start, finish: finish });
        break;
      }
      case "up": {
        const start = stateStart - 1 <= 0 ? 0 : stateStart - 1;
        const finish = start + props.dataSpec.elementsOnPage;
        props.setSelectedData({ start: start, finish: finish });
        break;
      }
      default:
        break;
    }
  }

  useEffect(() => {
    // обработчик на колесо мыши
    const ref = ref1;
    ref.current.addEventListener("wheel", ee);
    return () => {
      ref.current.removeEventListener("wheel", ee);
    };
  });
  const Tables = () => {
    return (
      <TransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <Table style={{ width: props.sizesWL.width }}>
          <Table.Head style={{ minHeight: 50 }}>
            <Table.TextHeaderCell>KKS</Table.TextHeaderCell>
            <Table.TextHeaderCell>start</Table.TextHeaderCell>
            <Table.TextHeaderCell>finish</Table.TextHeaderCell>
            <Table.TextHeaderCell>nameRus</Table.TextHeaderCell>
            <Table.TextHeaderCell>nameEng</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={props.SVGheight}>
            {rows.map((el) => {
              return (
                <Table.Row
                  key={keyGenerator(el.KKS)}
                  style={{
                    marginTop: props.yScale.paddingOuter() * props.yScale.step(),
                    // marginBottom: props.yScale.padding() * props.yScale.step(),
                    border: "1px solid red",
                    height: props.stringHeight,
                  }}
                >
                  <Table.TextCell>{el.KKS}</Table.TextCell>
                  <Table.TextCell>{el.start}</Table.TextCell>
                  <Table.TextCell>{el.finish}</Table.TextCell>
                  <Table.TextCell flexDirection={"column"} flexWrap={"wrap"} overflowX={"scroll"}>
                    {el.nameRus}
                  </Table.TextCell>
                  <Table.TextCell>{el.nameEng}</Table.TextCell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TransitionGroup>
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", width: props.sizesWL.width }} ref={ref1}>
      <Tables />
    </div>
  );
}

const getState = (state) => {
  return {
    ids: state.mainReducer.ids.totalListOfID,
    yScale: state.mainReducer.scales.yScale,
    SVGheight: state.mainReducer.sizesSVG.height,
    dataSpec: state.mainReducer.dataSpec,
    data: state.mainReducer.dataDisplayed,
    stringHeight: state.mainReducer.sizesSVG.stringHeight,
    sizesWL: state.mainReducer.workList.sizesWL,
  };
};

export default connect(getState, { setSelectedData })(App);

// const Data = () => {
//   const arr = [...props.ids].slice(state.start, state.finish);
//   const data = arr.map((el, i) => {
//     return (
//       <div
//         key={keyGenerator(el)}
//         style={{
//           height: props.yScale.bandwidth() + "px",
//           border: "1px solid red",
//         }}
//       >
//         {props.ids.indexOf(el)} {el}
//       </div>
//     );
//   });

//   return <div>{data}</div>;
// };
