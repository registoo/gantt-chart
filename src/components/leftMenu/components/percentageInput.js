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

const BadgePercentage = (props) => {
  if (props.badgeId === props.activeFilter) {
    return (
      <StyledBadgeCalendar color="primary" badgeContent=" ">
        <Tooltip title={`фильтр активен`}>
          <SlideshowIcon fontSize="large" />
        </Tooltip>
      </StyledBadgeCalendar>
    );
  } else if (props.activeFilter === "both") {
    return (
      <Tooltip title="применить фильтр">
        <SlideshowIcon fontSize="large" />
      </Tooltip>
    );
  } else {
    return <SlideshowIcon fontSize="large" color="disabled" />;
  }
};
const initialState = { activeFilter: "both" }; // "oneFilter" "twoFilters" "both"
const Func = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ ...initialState });
  const filterType = filtersTypes.filterPercentage;

  return (
    <List>
      <Divider />
      <ListItem id="percentageOnePercent" className={classes.container}>
        <ListItemIcon>
          <Tooltip title="сброс фильтра">
            <IconButton
              disabled={
                state.activeFilter === "both"
                  ? false
                  : state.activeFilter === "oneFilter"
                  ? false
                  : true
              }
              aria-label="refresh"
              onClick={() => {
                setState({
                  ...initialState,
                  activeFilter: state.activeFilter === "oneFilter" ? "both" : state.activeFilter,
                });
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
            className={classes.someWidth}
            id="oneOption"
            label="Точное значение"
            value={typeof state.one === "number" ? state.one : ""}
            type="number"
            inputProps={{
              min: 0,
              max: 100,
            }}
            onChange={(e) => {
              let value = +e.target.value;
              if (value > 100 || value < 0) return;
              if (e.target.value.length === 0) {
                const newState = state;
                delete newState.one;
                return setState({ ...newState });
              }
              setState({ ...state, one: value });
            }}
            onBlur={(e) => {
              if (state.activeFilter === "oneFilter") {
                if (e.target.value.length === 0) {
                  if (
                    typeof props.percentageFilter.from === "number" &&
                    !isNaN(props.percentageFilter.from)
                  ) {
                    setState({ ...state, one: props.percentageFilter.from });
                  }
                }
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        </div>
        <ListItemIcon>
          <IconButton
            disabled={
              state.activeFilter === "both"
                ? false
                : state.activeFilter === "oneFilter"
                ? false
                : true
            }
            color="primary"
            aria-label="apply dates"
            onClick={() => {
              setState({
                ...state,
                activeFilter: "oneFilter",
              });
              props.setFilter({
                attr: { from: state.one, to: state.one },
                filterType,
              });
            }}
          >
            <BadgePercentage activeFilter={state.activeFilter} badgeId="oneFilter" />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <ListItem id="percentageFromTo" className={classes.container}>
        <ListItemIcon>
          <Tooltip title="сброс фильтра">
            <IconButton
              disabled={
                state.activeFilter === "both"
                  ? false
                  : state.activeFilter === "twoFilters"
                  ? false
                  : true
              }
              aria-label="refresh"
              onClick={() => {
                setState({
                  ...initialState,
                  activeFilter: state.activeFilter === "twoFilters" ? "both" : state.activeFilter,
                });
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
            id="twoOptionsFrom"
            label="С"
            value={typeof state.from === "number" ? state.from : ""}
            type="number"
            inputProps={{
              min: 0,
              max: 100,
            }}
            onChange={(e) => {
              let value = +e.target.value;
              if (value > 100 || value < 0) return;
              if (e.target.value.length === 0) {
                const newState = state;
                delete newState.from;
                return setState({ ...newState });
              }
              setState({ ...state, from: value });
            }}
            onBlur={(e) => {
              if (state.activeFilter === "twoFilters") {
                if (e.target.value.length === 0) {
                  if (typeof props.percentageFilter.from === "number") {
                    setState({ ...state, from: props.percentageFilter.from });
                  }
                }
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
          <TextField
            className={classes.someWidth}
            id="twoOptionsTo"
            label="По"
            value={typeof state.to === "number" ? state.to : ""}
            type="number"
            inputProps={{
              min: 0,
              max: 100,
            }}
            onChange={(e) => {
              let value = +e.target.value;
              if (value > 100 || value < 0) return;
              if (e.target.value.length === 0) {
                const newState = state;
                delete newState.to;
                return setState({ ...newState });
              }
              setState({ ...state, to: value });
            }}
            onBlur={(e) => {
              if (state.activeFilter === "twoFilters") {
                if (e.target.value.length === 0) {
                  if (typeof props.percentageFilter.to === "number") {
                    setState({ ...state, to: props.percentageFilter.to });
                  }
                }
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        </div>
        <ListItemIcon>
          <IconButton
            disabled={
              state.activeFilter === "both"
                ? false
                : state.activeFilter === "twoFilters"
                ? false
                : true
            }
            color="primary"
            aria-label="apply dates"
            onClick={() => {
              if (state.from === 0 && state.to === 100) {
                // сброс фильтра при поиске от 0 до 100
                setState({ ...state, activeFilter: "both" });
                return props.setFilter({
                  attr: { reset: true },
                  filterType,
                });
              } else if (
                !state.from &&
                !state.to &&
                typeof state.from !== "number" &&
                typeof state.to !== "number"
              ) {
                // если не введены оба параметра
                setState({ from: 0, to: 100, activeFilter: "twoFilters" });
                return props.setFilter({
                  attr: { from: 0, to: 100 },
                  filterType,
                });
              } else if (!state.from && typeof state.from !== "number") {
                // если не введён параметр from
                setState({ ...state, from: 0, activeFilter: "twoFilters" });
                return props.setFilter({
                  attr: { from: 0, to: state.to },
                  filterType,
                });
              } else if (!state.to && typeof state.to !== "number") {
                // если не введён параметр to
                setState({ ...state, to: 100, activeFilter: "twoFilters" });
                return props.setFilter({
                  attr: { from: state.from, to: 100 },
                  filterType,
                });
              }
              setState({ ...state, activeFilter: "twoFilters" });
              props.setFilter({
                attr: { from: state.from, to: state.to },
                filterType,
              });
            }}
          >
            <BadgePercentage activeFilter={state.activeFilter} badgeId="twoFilters" />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <Divider />
    </List>
  );
};

const getState = (state) => {
  return {
    filterPercentage: state.mainReducer.dataSpec.filters.filtersIds.filterPercentage,
    percentageFilter: state.mainReducer.dataSpec.filters.percentageFilter,
  };
};

export default connect(getState, { setFilter })(Func);
