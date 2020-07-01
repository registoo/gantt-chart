import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { changeXRange } from "../../redux/mainReducer/action";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));

function DatePickers(props) {
  const [state, setState] = useState({ start: props.start, finish: props.finish });
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date-picker-start"
        label="Start"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: 20 }}
      />
      <TextField
        id="date-picker-finish"
        label="Finish"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

const getState = (state) => {
  return {
    start: state.mainReducer,
  };
};
export default connect(getState, { changeXRange })(DatePickers);
