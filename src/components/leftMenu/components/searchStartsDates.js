import React, { useState, useRef } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import ButtonBadge from "./buttonBadge.js";
import filtersTypes from "../../../redux/mainReducer/dataFilters/typesOfFilters.js";
import moment from "moment";
import { setFilter } from "../../../redux/mainReducer/action.js";
import { connect } from "react-redux";

function SearchStarts(props) {
  const projectEarlyStart = props.dates.projectEarlyStart;
  const projectLateStart = props.dates.projectLateStart;
  const projectEarlyStartYYYYMMDD = props.dates.projectEarlyStartYYYYMMDD;
  const projectLateStartYYYYMMDD = props.dates.projectLateStartYYYYMMDD;
  const selectedEarlyStartYYYYMMDD = props.dates.selectedEarlyStartYYYYMMDD;
  const selectedLateStartYYYYMMDD = props.dates.selectedLateStartYYYYMMDD;
  const from = props.dates.from;
  const to = props.dates.to;
  const classes = props.classes;
  const refStartStart = useRef(null);
  const refStartFinish = useRef(null);

  const initialFinishState = {
    earlyStart: projectEarlyStart,
    lateStart: projectLateStart,
  };
  const [stateStart, setStateStart] = useState({ ...initialFinishState });
  const [stateError, setStateError] = useState({
    boolEarlyStart: false,
    textEarlyStart: "",
    boolLateStart: false,
    textLateStart: "",
  });

  return (
    <ListItem id="listDateStart">
      <ListItemIcon>
        <Tooltip title="сброс фильтра">
          <IconButton
            aria-label="refresh"
            onClick={() => {
              setStateError({ ...stateError, boolEarlyStart: false, boolLateStart: false });
              setStateStart({ ...initialFinishState });
              props.setFilter({
                attr: { reset: true },
                filterType: filtersTypes.filterByStartDate,
              });
              refStartStart.current.value = projectEarlyStartYYYYMMDD;
              refStartFinish.current.value = projectLateStartYYYYMMDD;
            }}
          >
            <SettingsBackupRestoreIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
      <ListItemText>Старт</ListItemText>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          error={stateError.boolEarlyStart}
          helperText={stateError.boolEarlyStart ? stateError.textEarlyStart : undefined}
          inputRef={refStartStart}
          id="date-picker-start-start"
          inputProps={{
            min: projectEarlyStartYYYYMMDD,
            max: projectLateStartYYYYMMDD,
          }}
          label="с"
          type="date"
          defaultValue={selectedEarlyStartYYYYMMDD}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setStateError({ ...stateError, boolEarlyStart: false });
            const earlyStart = moment.utc(e.target.value).valueOf();
            setStateStart({
              ...stateStart,
              earlyStart,
            });
          }}
        />
        <TextField
          error={stateError.boolLateStart}
          helperText={stateError.boolLateStart ? stateError.textLateStart : undefined}
          inputRef={refStartFinish}
          id="date-picker-start-finish"
          inputProps={{
            min: projectEarlyStartYYYYMMDD,
            max: projectLateStartYYYYMMDD,
          }}
          label="по"
          type="date"
          defaultValue={selectedLateStartYYYYMMDD}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setStateError({ ...stateError, boolLateStart: false });
            const lateStart = moment.utc(e.target.value).valueOf();
            setStateStart({
              ...stateStart,
              lateStart,
            });
          }}
        />
      </div>
      <ButtonBadge
        filterType={filtersTypes.filterByStartDate}
        onClickFunc={() => {
          if (stateStart.earlyStart < from) {
            setStateError({
              ...stateError,
              boolEarlyStart: true,
              boolLateStart: false,
              textEarlyStart: `Дата меньше старта проекта ${moment.utc(from).format("DD-MM-YYYY")}`,
            });
            return;
          } else if (stateStart.earlyStart > to) {
            setStateError({
              ...stateError,
              boolEarlyStart: true,
              boolLateStart: false,
              textEarlyStart: `Дата больше финиша проекта ${moment.utc(to).format("DD-MM-YYYY")}`,
            });
            return;
          } else if (stateStart.earlyStart > stateStart.lateStart) {
            setStateError({
              ...stateError,
              boolLateStart: true,
              textLateStart: `Проверьте даты. Поиск начинается с: ${moment
                .utc(stateStart.earlyStart)
                .format("DD-MM-YYYY")}`,
            });
            return;
          }
          props.setFilter({
            attr: {
              earlyStart: stateStart.earlyStart,
              lateStart: stateStart.lateStart,
            },
            filterType: filtersTypes.filterByStartDate,
          });
        }}
      ></ButtonBadge>
    </ListItem>
  );
}

const getState = (state) => {
  return {
    selectedData: state.mainReducer.slicedData.selectedData,
  };
};

export default connect(getState, { setFilter })(SearchStarts);
