import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { keyGenerator, rowHasError } from "../../auxFunctions";
import { Paper, Grid, Typography } from "@material-ui/core/";
import * as d3 from "d3";

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

const f = (props) => {
  const dataRange = props.data.map((d) => {
    const RootDIV = () => (
      <Paper
        style={{
          border: "1px solid black",
          backgroundColor: "red",
          height: props.scales.yScale.bandwidth() + "px",
          marginBottom: props.scales.yScale.padding() * props.scales.yScale.step(),
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
    <Fragment>
      {/* <div style={{ height: "20px" }}>SHAPKA</div> */}
      <div
        style={{
          paddingTop: props.scales.yScale.paddingOuter() * props.scales.yScale.step(),
          marginBottom: props.sizesSVG.margin.bottom,
          background: "green",
          marginTop: "50px",
          overflow: "hidden",
        }}
      >
        {dataRange}
      </div>
    </Fragment>
  );
};

const getState = (state) => {
  return state.mainReducer;
};

export default connect(getState)(f);
