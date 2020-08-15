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
  if (props.disableFilter) {
    return <SlideshowIcon fontSize="large" color="disabled" />;
  }
  if (props.activeFilter === props.currentFilter) {
    return (
      <StyledBadgeCalendar color="primary" badgeContent=" ">
        <Tooltip title={`фильтр активен`}>
          <SlideshowIcon fontSize="large" />
        </Tooltip>
      </StyledBadgeCalendar>
    );
  } else {
    return (
      <Tooltip title="применить фильтр">
        <SlideshowIcon fontSize="large" />
      </Tooltip>
    );
  }
};

const Func = (props) => {
  const classes = useStyles();
  const disableOneFilter = (() => {
    if (!props.selectedPercentageFilter || props.selectedPercentageFilter === "oneFilter") {
      return false;
    } else {
      return true;
    }
  })();
  const disableTwoFilters = (() => {
    if (!props.selectedPercentageFilter || props.selectedPercentageFilter === "twoFilters") {
      return false;
    } else {
      return true;
    }
  })();
  const initialState = {
    from: !props.selectedPercentageFilter ? undefined : props.rangeOfPercentageFilter.from,
    to: !props.selectedPercentageFilter ? undefined : props.rangeOfPercentageFilter.to,
    one: !props.selectedPercentageFilter ? undefined : props.rangeOfPercentageFilter.from,
  };
  const [state, setState] = useState({ ...initialState });
  const filterType = filtersTypes.filterPercentage;

  return (
    <List>
      <Divider />
      <ListItem id="percentageOnePercent" className={classes.container}>
        <ListItemIcon>
          <Tooltip title={disableOneFilter ? "активен другой фильтр" : "сброс фильтра"}>
            <span>
              <IconButton
                disabled={disableOneFilter}
                aria-label="refresh"
                onClick={() => {
                  setState({});
                  props.setFilter({
                    attr: { reset: true },
                    filterType,
                    hierarchyFullData: props.hierarchyFullData,
                    hierarchyFullIds: props.hierarchyFullIds,
                  });
                }}
              >
                <ClearIcon />
              </IconButton>
            </span>
          </Tooltip>
        </ListItemIcon>
        <div>
          <TextField
            className={classes.someWidth}
            id="oneOption"
            label="Точное значение"
            value={disableOneFilter ? "" : typeof state.one === "number" ? state.one : ""}
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
              if (!disableOneFilter) {
                if (e.target.value.length === 0) {
                  if (
                    typeof props.rangeOfPercentageFilter.from === "number" &&
                    !isNaN(props.rangeOfPercentageFilter.from)
                  ) {
                    setState({ ...state, one: props.rangeOfPercentageFilter.from });
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
            disabled={disableOneFilter}
            color="primary"
            aria-label="apply dates"
            onClick={() => {
              if (!state.one && typeof state.one !== "number") {
                return;
              }
              props.setFilter({
                attr: { from: state.one, to: state.one, optionsType: "oneFilter" },
                filterType,
                hierarchyFullData: props.hierarchyFullData,
                hierarchyFullIds: props.hierarchyFullIds,
              });
            }}
          >
            <BadgePercentage
              disableFilter={disableOneFilter}
              activeFilter={props.selectedPercentageFilter}
              currentFilter={"oneFilter"}
            />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <ListItem id="percentageFromTo" className={classes.container}>
        <ListItemIcon>
          <Tooltip title={disableTwoFilters ? "активен другой фильтр" : "сброс фильтра"}>
            <span>
              <IconButton
                disabled={disableTwoFilters}
                aria-label="refresh"
                onClick={() => {
                  setState({});
                  props.setFilter({
                    attr: { reset: true },
                    filterType,
                    hierarchyFullData: props.hierarchyFullData,
                    hierarchyFullIds: props.hierarchyFullIds,
                  });
                }}
              >
                <ClearIcon />
              </IconButton>
            </span>
          </Tooltip>
        </ListItemIcon>
        <div>
          <TextField
            className={`${classes.someWidth} ${classes.rightMargin}`}
            id="twoOptionsFrom"
            label="С"
            value={disableTwoFilters ? "" : typeof state.from === "number" ? state.from : ""}
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
              if (!disableTwoFilters) {
                if (e.target.value.length === 0) {
                  if (typeof props.rangeOfPercentageFilter.from === "number") {
                    setState({ ...state, from: props.rangeOfPercentageFilter.from });
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
            value={disableTwoFilters ? "" : typeof state.to === "number" ? state.to : ""}
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
              if (!disableTwoFilters) {
                if (e.target.value.length === 0) {
                  if (typeof props.rangeOfPercentageFilter.to === "number") {
                    setState({ ...state, to: props.rangeOfPercentageFilter.to });
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
            disabled={disableTwoFilters}
            color="primary"
            aria-label="apply dates"
            onClick={() => {
              if (state.from === 0 && state.to === 100) {
                // сброс фильтра при поиске от 0 до 100
                return props.setFilter({
                  attr: { reset: true, optionsType: "twoFilters" },
                  filterType,
                  hierarchyFullData: props.hierarchyFullData,
                  hierarchyFullIds: props.hierarchyFullIds,
                });
              } else if (
                !state.from &&
                !state.to &&
                typeof state.from !== "number" &&
                typeof state.to !== "number"
              ) {
                // если не введены оба параметра
                return;
              } else if (!state.from && typeof state.from !== "number") {
                // если не введён параметр from
                setState({ ...state, from: 0 });
                return props.setFilter({
                  attr: { from: 0, to: state.to, optionsType: "twoFilters" },
                  filterType,
                  hierarchyFullData: props.hierarchyFullData,
                  hierarchyFullIds: props.hierarchyFullIds,
                });
              } else if (!state.to && typeof state.to !== "number") {
                // если не введён параметр to
                setState({ ...state, to: 100 });
                return props.setFilter({
                  attr: { from: state.from, to: 100, optionsType: "twoFilters" },
                  filterType,
                  hierarchyFullData: props.hierarchyFullData,
                  hierarchyFullIds: props.hierarchyFullIds,
                });
              }
              props.setFilter({
                attr: { from: state.from, to: state.to, optionsType: "twoFilters" },
                filterType,
                hierarchyFullData: props.hierarchyFullData,
                hierarchyFullIds: props.hierarchyFullIds,
              });
            }}
          >
            <BadgePercentage
              disableFilter={disableTwoFilters}
              activeFilter={props.selectedPercentageFilter}
              currentFilter={"twoFilters"}
            />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <Divider />
    </List>
  );
};

const getState = (state) => {
  return {
    filterPercentage: state.mainReducer.filters.filtersIds.filterPercentage,
    rangeOfPercentageFilter: state.mainReducer.filters.percentageFilter.range,
    selectedPercentageFilter: state.mainReducer.filters.percentageFilter.selectedPercentageFilter,
    hierarchyFullData: state.fullDataReducer.fullData,
    hierarchyFullIds: state.fullDataReducer.fullIds,
  };
};

export default connect(getState, { setFilter })(Func);
