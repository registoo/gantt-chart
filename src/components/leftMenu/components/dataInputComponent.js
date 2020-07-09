import React, { useState } from "react";
import { setFilter } from "../../../redux/mainReducer/action.js";
import { connect } from "react-redux";
import filtersTypes from "../../../redux/mainReducer/dataFilters/typesOfFilters.js";
import moment from "moment";
import ButtonBadge from "./buttonBadge.js";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";

function SearchFinishes(props) {
  const classes = props.classes;
  const from = props.dates.from;
  const to = props.dates.to;
  let projectEarly,
    projectLate,
    projectEarlyDDMMYYYY,
    projectLateDDMMYYYY,
    selectedEarlyDDMMYYYY,
    selectedLateDDMMYYYY,
    filterType,
    textForListItem;
  switch (props.dateType) {
    case "Finish":
      textForListItem = "Финиш";
      filterType = filtersTypes.filterByFinishDate;
      projectEarly = props.dates.projectEarlyFinish;
      projectLate = props.dates.projectLateFinish;
      projectEarlyDDMMYYYY = props.dates.projectEarlyFinishYYYYMMDD;
      projectLateDDMMYYYY = props.dates.projectLateFinishYYYYMMDD;
      selectedEarlyDDMMYYYY = props.dates.selectedEarlyFinishYYYYMMDD;
      selectedLateDDMMYYYY = props.dates.selectedLateFinishYYYYMMDD;
      break;
    case "Start":
      textForListItem = "Старт";
      filterType = filtersTypes.filterByStartDate;
      projectEarly = props.dates.projectEarlyStart;
      projectLate = props.dates.projectLateStart;
      projectEarlyDDMMYYYY = props.dates.projectEarlyStartYYYYMMDD;
      projectLateDDMMYYYY = props.dates.projectLateStartYYYYMMDD;
      selectedEarlyDDMMYYYY = props.dates.selectedEarlyStartYYYYMMDD;
      selectedLateDDMMYYYY = props.dates.selectedLateStartYYYYMMDD;
      break;
    case "Performed":
      textForListItem = "Выполняе\nмые в период";
      filterType = filtersTypes.filterByPerformedDate;
      projectEarly = props.dates.projectEarlyStart;
      projectLate = props.dates.projectLateFinish;
      projectEarlyDDMMYYYY = props.dates.projectEarlyStartYYYYMMDD;
      projectLateDDMMYYYY = props.dates.projectLateFinishYYYYMMDD;
      selectedEarlyDDMMYYYY = props.dates.selectedEarlyStartYYYYMMDD;
      selectedLateDDMMYYYY = props.dates.selectedLateFinishYYYYMMDD;
      break;
    default:
      break;
  }

  const initialState = {
    earlyDate: projectEarly,
    lateDate: projectLate,
  };

  const [state, setState] = useState({ ...initialState });
  const [stateError, setStateError] = useState({
    boolEarly: false,
    textEarly: "",
    boolLate: false,
    textLate: "",
  });

  return (
    <ListItem id={`listDate${props.dateType}`}>
      <ListItemIcon>
        <Tooltip title="сброс фильтра">
          <IconButton
            aria-label="refresh"
            onClick={() => {
              setStateError({ ...stateError, boolEarly: false, boolLate: false });
              setState({ ...initialState });
              props.setFilter({
                attr: { reset: true },
                filterType,
              });
            }}
          >
            <SettingsBackupRestoreIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
      <ListItemText>{textForListItem}</ListItemText>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          error={stateError.boolEarly}
          helperText={stateError.boolEarly ? stateError.textEarly : undefined}
          id={`date-picker-${props.dateType}-start`}
          inputProps={{
            min: projectEarlyDDMMYYYY,
            max: projectLateDDMMYYYY,
          }}
          label="с"
          type="date"
          value={state.earlyFinishYYYYMMDD ? state.earlyFinishYYYYMMDD : selectedEarlyDDMMYYYY}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setStateError({ ...stateError, boolEarly: false });
            setState({
              ...state,
              earlyDate: moment.utc(e.target.value).valueOf(),
              earlyFinishYYYYMMDD: e.target.value,
            });
          }}
        />
        <TextField
          error={stateError.boolLate}
          helperText={stateError.boolLate ? stateError.textLate : undefined}
          id={`date-picker-${props.dateType}-finish`}
          inputProps={{
            min: projectEarlyDDMMYYYY,
            max: projectLateDDMMYYYY,
          }}
          label="по"
          type="date"
          value={state.lateFinishYYYYMMDD ? state.lateFinishYYYYMMDD : selectedLateDDMMYYYY}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setStateError({ ...stateError, boolLate: false });
            setState({
              ...state,
              lateDate: moment.utc(e.target.value).valueOf(),
              lateFinishYYYYMMDD: e.target.value,
            });
          }}
        />
      </div>
      <ButtonBadge
        filterType={filterType}
        onClickFunc={() => {
          if (state.earlyDate < from) {
            setStateError({
              ...stateError,
              boolEarly: true,
              boolLate: false,
              textEarly: `Дата меньше старта проекта ${moment.utc(from).format("DD-MM-YYYY")}`,
            });
            return;
          } else if (state.earlyDate > to) {
            setStateError({
              ...stateError,
              boolEarly: true,
              boolLate: false,
              textEarly: `Дата больше финиша проекта ${moment.utc(to).format("DD-MM-YYYY")}`,
            });
            return;
          } else if (state.lateDate < state.earlyDate) {
            setStateError({
              ...stateError,
              boolLate: true,
              textLate: `Проверьте даты. Поиск начинается с: ${moment
                .utc(state.earlyDate)
                .format("DD-MM-YYYY")}`,
            });
            return;
          }
          props.setFilter({
            attr: {
              earlyDate: state.earlyDate,
              lateDate: state.lateDate,
            },
            filterType: filterType,
          });
        }}
      ></ButtonBadge>
    </ListItem>
  );
}

export default connect(null, { setFilter })(SearchFinishes);
