import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import SearchStarts from "./components/searchStartsDates.js";
import SearchFinishes from "./components/searchFinishesDates.js";
import SearchPerformed from "./components/searchPerformedDates.js";
import computeDates from "./components/computeDates.js";

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
      <SearchStarts dates={datesObject} classes={classes} />
      <Divider />
      <SearchFinishes dates={datesObject} classes={classes} />
      <Divider light />
      <SearchPerformed dates={datesObject} classes={classes} />
      <Divider light />
      <ListItem></ListItem>
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
