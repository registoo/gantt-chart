import React, { useEffect } from "react";
import { connect } from "react-redux";
import { keyGenerator, rowHasError } from "../../auxFunctions";
import { Paper, Grid, Typography } from "@material-ui/core/";
import { motion } from "framer-motion";

const Ff = (props) => {
  useEffect(() => {
    // console.log("Slider", d3.select("#slider").node());
  });

  if (rowHasError(props.d.data)) {
    return (
      <Grid item xs={12}>
        <Typography>{props.d.data.isError.formattedText}</Typography>
      </Grid>
    );
  }
  return (
    <Grid item xs={6}>
      <Typography>{props.d.id}</Typography>
    </Grid>
  );
};

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
          <Ff d={d}></Ff>

          <Grid item xs={3}>
            {rowHasError(d.data) ? null : <Typography>{d.data.start.formattedText}</Typography>}
          </Grid>

          <Grid item xs={3}>
            {rowHasError(d.data) ? null : <Typography>{d.data.finish.formattedText}</Typography>}
          </Grid>
          <Grid item xs={12}>
            {rowHasError(d.data) ? null : (
              <Typography noWrap variant="body2">
                {d.data.nameRus.formattedText}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {rowHasError(d.data) ? null : (
              <Typography noWrap variant="body2">
                {d.data.nameEng.formattedText}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    );
    return <RootDIV key={keyGenerator(d.id)}></RootDIV>;
  });
  return (
    <motion.div style={{ width: props.sizesWL.width }}>
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
