import React from "react";
import { connect } from "react-redux";
import { keyGenerator } from "../../auxFunctions";
import { Paper, Grid } from "@material-ui/core/";
import { motion } from "framer-motion";
import { ColTypography } from "./components/columnElement";

const WorksList = (props) => {
  const dataRange = props.data.map((d) => {
    const RootDIV = () => (
      <Paper
        style={{
          border: "1px solid black",
          backgroundColor: "red",
          height: props.yScale.bandwidth() + "px",
          marginBottom: props.yScale.padding() * props.yScale.step(),
        }}
      >
        <Grid container spacing={0}>
          <ColTypography
            grid={{ xs: 2 }}
            typography={{ variant: "body2", wrap: "noWrap" }}
            element="id"
            data={d}
          ></ColTypography>

          <ColTypography
            grid={{ xs: 1 }}
            typography={{ variant: "body2", wrap: "noWrap" }}
            element="start"
            data={d}
          ></ColTypography>

          <ColTypography
            grid={{ xs: 1 }}
            typography={{ variant: "body2", wrap: "noWrap" }}
            element="finish"
            data={d}
          ></ColTypography>

          <ColTypography
            grid={{ xs: 4 }}
            typography={{ variant: "caption", wrap: "wrap" }}
            element="nameRus"
            data={d}
          ></ColTypography>

          <ColTypography
            grid={{ xs: 4 }}
            typography={{ variant: "caption", wrap: "wrap" }}
            element="nameEng"
            data={d}
          ></ColTypography>
        </Grid>
      </Paper>
    );
    return <RootDIV key={keyGenerator(d.id)}></RootDIV>;
  });
  return (
    <motion.div style={{ width: props.sizesWL.width, marginTop: 50 }}>
      {/* <div style={{ height: "20px" }}>SHAPKA</div> */}
      <div
        style={{
          paddingTop: props.yScale.paddingOuter() * props.yScale.step(),
          marginBottom: props.sizesSVG.margin.bottom,
          background: "green",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {dataRange}
      </div>
    </motion.div>
  );
};

const getState = (state) => {
  return {
    data: state.mainReducer.data,
    yScale: state.mainReducer.scales.yScale,
    sizesWL: state.mainReducer.sizesWL,
    sizesSVG: state.mainReducer.sizesSVG,
  };
};

export default connect(getState)(WorksList);
