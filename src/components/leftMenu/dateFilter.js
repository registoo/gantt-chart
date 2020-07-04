import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { setFilter } from "../../redux/mainReducer/action";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import filtersTypes from "../../redux/mainReducer/dataFilters/typesOfFilters.js";

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
  const [state, setState] = useState({
    start: props.start,
    finish: props.finish,
    initialDate: {
      start: props.start,
      finish: props.finish,
    },
  });
  const classes = useStyles();

  return (
    // <List component="nav" className={classes.root} aria-label="mailbox folders">
    //   <ListItem>
    //     <ListItemText primary="Inbox" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem divider>
    //     <ListItemText primary="Drafts" />
    //   </ListItem>
    //   <ListItem>
    //     <ListItemText primary="Trash" />
    //   </ListItem>
    //   <Divider light />
    //   <ListItem>
    //     <ListItemText primary="Spam" />
    //   </ListItem>
    // </List>
    <form className={classes.container} noValidate>
      <div className={classes.labelField}>
        <Typography variant="subtitle2">Start</Typography>
      </div>
      <TextField
        id="date-picker-start"
        label="с"
        type="date"
        defaultValue={moment.utc(props.start).format("YYYY-MM-DD")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          const start = moment.utc(e.target.value).valueOf();
          setState({ ...state, start });

          if (state.initialDate.start === start && state.initialDate.finish === state.finish) {
            props.setFilter({
              attr: { start, finish: state.finish },
              filterType: filtersTypes.filterByStartDate,
            });
            return;
          }
          props.setFilter({
            attr: { start, finish: state.finish },
            filterType: filtersTypes.filterByStartDate,
          });
        }}
      />
      <TextField
        id="date-picker-finish"
        label="по"
        type="date"
        defaultValue={moment.utc(props.finish).subtract(1, "ms").format("YYYY-MM-DD")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setState({ start: state.start, finish: e.target.value });
        }}
      />
    </form>
  );
}

const getState = (state) => {
  return {
    finish: state.mainReducer.scales.selectedFinishMS,
    start: state.mainReducer.scales.selectedStartMS,
  };
};
export default connect(getState, { setFilter })(DatePickers);
