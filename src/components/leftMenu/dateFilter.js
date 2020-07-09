import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import computeDates from "./components/computeDates.js";
import DataInputComponent from "./components/dataInputComponent.js";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
  labelField: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 62,
    minWidth: 62,
    marginRight: 6,
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

function DatePickers(props) {
  const classes = useStyles();
  const datesObject = computeDates(props);
  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <Divider />
      <DataInputComponent dateType="Start" dates={datesObject} classes={classes} />
      <Divider />
      <DataInputComponent dateType="Finish" dates={datesObject} classes={classes} />
      <Divider light />
      <DataInputComponent dateType="Performed" dates={datesObject} classes={classes} />
      <Divider light />
    </List>
  );
}

const getState = (state) => {
  return {
    selectedData: state.mainReducer.slicedData.selectedData,
    fullData: state.mainReducer.fullData,
  };
};
export default connect(getState)(DatePickers);
