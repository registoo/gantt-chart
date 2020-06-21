import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { keyGenerator } from "../../auxFunctions";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { setSelectedData } from "../../redux/mainReducer/action";

function DataRange(props) {
  // количество отображаемых строчек
  const elementsOnPage = props.dataSpec.elementsOnPage;
  const [state, setState] = useState({
    start: props.dataSpec.dataRange.start,
    finish: props.dataSpec.dataRange.finish,
  });
  const ref1 = useRef(null);

  // рисует данные
  const Data = () => {
    const arr = [...props.ids].slice(state.start, state.finish);
    const data = arr.map((el, i) => {
      // убираем у последнего marginBottom
      if (i === arr.length - 1) {
        return (
          <div
            key={keyGenerator(el)}
            style={{
              height: props.yScale.bandwidth() + "px",
              border: "1px solid red",
            }}
          >
            {props.ids.indexOf(el)} {el}
          </div>
        );
      }
      return (
        <div
          key={keyGenerator(el)}
          style={{
            height: props.yScale.bandwidth() + "px",
            marginBottom: props.yScale.padding() * props.yScale.step(),
            border: "1px solid red",
          }}
        >
          {props.ids.indexOf(el)} {el}
        </div>
      );
    });

    return <div>{data}</div>;
  };

  // ползунок
  const Polzynok = (props) => {
    return (
      <AppgradedPolzynok
        orientation="vertical"
        max={0}
        min={(props.dataLength - elementsOnPage) * -1}
        defaultValue={state.start * -1}
        component="div"
        style={{ paddingLeft: 0, paddingRight: 1 }}
        track="inverted"
      />
    );
  };
  const AppgradedPolzynok = withStyles({
    // убрана круглая штучка со слайдера
    thumb: {
      height: 0,
      width: 0,
    },
  })(Slider);

  useEffect(() => {
    // обработчик на колесо мыши
    ref1.current.addEventListener("mousewheel", function (e) {
      const wDelta = e.wheelDelta < 0 ? "down" : "up";
      switch (wDelta) {
        case "down": {
          const finish = state.finish + 1 >= props.ids.length ? props.ids.length : state.finish + 1;
          const start = finish - elementsOnPage;
          setState({ start: start, finish: finish });
          props.setSelectedData({ start: start, finish: finish });
          break;
        }
        case "up": {
          const start = state.start - 1 <= 0 ? 0 : state.start - 1;
          const finish = start + elementsOnPage;
          setState({ start: start, finish: finish });
          props.setSelectedData({ start: start, finish: finish });
          break;
        }
        default:
          break;
      }
    });
  });

  // не знаю зачем я это сделал
  // но если его убрать - крутилка колесом будет лагать и медленно выполняться, надо выяснить почему
  function Mydiv(props) {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <Polzynok dataLength={props.dataLength} />
        </div>
        <div ref={ref1} style={{ width: "100%" }}>
          {props.children}
        </div>
      </div>
    );
  }

  return (
    <motion.div style={{ width: props.sizesWL.width, marginTop: 50 }}>
      <Mydiv dataLength={props.ids.length}>
        <Data></Data>
      </Mydiv>
    </motion.div>
  );
}

const getState = (state) => {
  return {
    ids: state.mainReducer.ids.totalListOfID,
    data: state.mainReducer.data,
    columnsName: state.mainReducer.workList.columnsName,
    rowHeight: state.mainReducer.sizesSVG.stringHeight,
    yScale: state.mainReducer.scales.yScale,
    sizesWL: state.mainReducer.workList.sizesWL,
    dataSpec: state.mainReducer.dataSpec,
  };
};

export default connect(getState, { setSelectedData })(DataRange);
