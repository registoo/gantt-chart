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
  const classes = props.classes;
  const refStartStart = useRef(null);
  const refStartFinish = useRef(null);
  const [stateStart, setStateStart] = useState({
    earlyStart: projectEarlyStart,
    lateStart: projectLateStart,
  });

  return (
    <ListItem id="listDateStart">
      <ListItemIcon>
        <Tooltip title="сброс фильтра">
          <IconButton
            aria-label="refresh"
            onClick={() => {
              props.setFilter({
                attr: { earlyStart: 0, lateStart: 0 },
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
            const earlyStart0 = moment.utc(e.target.value).valueOf();
            // проверка если < projectEarlyStart
            const earlyStart1 = earlyStart0 < projectEarlyStart ? projectEarlyStart : earlyStart0;
            // проверка если > projectLateStart
            const earlyStart2 = earlyStart1 > projectLateStart ? projectLateStart : earlyStart1;
            setStateStart({
              ...stateStart,
              earlyStart: earlyStart2,
            });
          }}
        />
        <TextField
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
            const lateStart0 = moment.utc(e.target.value).valueOf();
            // проверка если > projectLateStart
            const lateStart1 = lateStart0 > projectLateStart ? projectLateStart : lateStart0;
            // проверка если < projectEarlyStart
            const lateStart2 = lateStart1 < projectEarlyStart ? projectEarlyStart : lateStart1;
            setStateStart({
              ...stateStart,
              lateStart: lateStart2,
            });
          }}
        />
      </div>
      <ButtonBadge
        filterType={filtersTypes.filterByStartDate}
        onClickFunc={() =>
          props.setFilter({
            attr: {
              earlyStart: stateStart.earlyStart,
              lateStart: stateStart.lateStart,
            },
            filterType: filtersTypes.filterByStartDate,
          })
        }
      ></ButtonBadge>
    </ListItem>
  );
}

export default connect(null, { setFilter })(SearchStarts);
