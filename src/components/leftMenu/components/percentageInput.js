import React, { useState } from "react";
import { connect } from "react-redux";
import { setFilter } from "../../../redux/mainReducer/action";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import filtersTypes from "../../../redux/mainReducer/dataFilters/typesOfFilters.js";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Badge from "@material-ui/core/Badge";
import SlideshowIcon from "@material-ui/icons/Slideshow";

const StyledBadgeCalendar = withStyles((theme) => ({
  badge: {
    right: 6,
    top: 6,
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-between",
  },
  rightMargin: {
    marginRight: "4ch",
  },
  someWidth: {
    width: "10ch",
  },
}));

const Func = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ from: 0, to: 100 });
  const filterType = filtersTypes.filterPercentage;

  return (
    <List>
      <Divider />
      <ListItem id="percentageFromTo" className={classes.container}>
        <ListItemIcon>
          <Tooltip title="сброс фильтра">
            <IconButton
              aria-label="refresh"
              onClick={() => {
                setState({ from: 0, to: 100 });
                props.setFilter({
                  attr: { reset: true },
                  filterType,
                });
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <div>
          <TextField
            className={`${classes.someWidth} ${classes.rightMargin}`}
            id="standard-from"
            label="С"
            value={state.from}
            type="number"
            inputProps={{
              min: 0,
              max: 100,
            }}
            onChange={(e) => {
              const value = +e.target.value;
              if (value > 100 || value < 0) return;
              setState({ ...state, from: value });
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
          <TextField
            className={classes.someWidth}
            id="standard-to"
            label="По"
            value={state.to}
            type="number"
            inputProps={{
              min: 0,
              max: 100,
            }}
            onChange={(e) => {
              const value = +e.target.value;
              if (value > 100 || value < 0) return;
              setState({ ...state, to: value });
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        </div>
        <ListItemIcon>
          <IconButton
            color="primary"
            aria-label="apply dates"
            onClick={() => {
              console.log("ON CLICK");

              props.setFilter({
                attr: { from: state.from, to: state.to },
                filterType,
              });
            }}
          >
            {true ? (
              <StyledBadgeCalendar color="primary" badgeContent=" ">
                <Tooltip title={`фильтр активен`}>
                  <SlideshowIcon fontSize="large" />
                </Tooltip>
              </StyledBadgeCalendar>
            ) : (
              <Tooltip title="применить фильтр">
                <SlideshowIcon fontSize="large" />
              </Tooltip>
            )}
          </IconButton>
        </ListItemIcon>
      </ListItem>

      <Divider />
    </List>
  );
};

// const getState = (state) => {
//   return {
//     options: state.mainReducer.dataSpec.filters.worksFilter.listOfWorksForSearcherInput,
//     value: state.mainReducer.dataSpec.filters.worksFilter.pickedWorksIds,
//   };
// };

export default connect(null, { setFilter })(Func);
