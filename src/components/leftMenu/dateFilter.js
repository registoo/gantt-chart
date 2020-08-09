import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import computeDates from "./components/computeDates.js";
import DataInputComponent from "./components/dataInputComponent.js";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-between",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 140,
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
    hierarchySelectedData: state.mainReducer.slicedData.hierarchySelectedData,
    hierarchyFullData: state.mainReducer.hierarchyFullData,
  };
};
export default connect(getState)(DatePickers);
