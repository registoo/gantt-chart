import React, { useState, useRef } from "react";
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
  const projectEarlyFinish = props.dates.projectEarlyFinish;
  const projectLateFinish = props.dates.projectLateFinish;
  const projectEarlyFinishYYYYMMDD = props.dates.projectEarlyFinishYYYYMMDD;
  const projectLateFinishYYYYMMDD = props.dates.projectLateFinishYYYYMMDD;
  const selectedEarlyFinishYYYYMMDD = props.dates.selectedEarlyFinishYYYYMMDD;
  const selectedLateFinishYYYYMMDD = props.dates.selectedLateFinishYYYYMMDD;
  const [stateFinish, setStateFinish] = useState({
    earlyFinish: projectEarlyFinish,
    lateFinish: projectLateFinish,
  });
  const refFinishStart = useRef(null);
  const refFinishFinish = useRef(null);
  return (
    <ListItem id="listDateFinish">
      <ListItemIcon>
        <Tooltip title="сброс фильтра">
          <IconButton
            aria-label="refresh"
            onClick={() => {
              props.setFilter({
                attr: { earlyFinish: 0, lateFinish: 0 },
                filterType: filtersTypes.filterByFinishDate,
              });
              refFinishStart.current.value = projectEarlyFinishYYYYMMDD;
              refFinishFinish.current.value = projectLateFinishYYYYMMDD;
            }}
          >
            <SettingsBackupRestoreIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
      <ListItemText>Финиш</ListItemText>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          inputRef={refFinishStart}
          id="date-picker-finish-start"
          inputProps={{
            min: projectEarlyFinishYYYYMMDD,
            max: projectLateFinishYYYYMMDD,
          }}
          label="с"
          type="date"
          defaultValue={selectedEarlyFinishYYYYMMDD}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const earlyFinish0 = moment.utc(e.target.value).valueOf();
            // проверка если < projectEarlyFinish
            const earlyFinish1 =
              earlyFinish0 < projectEarlyFinish ? projectEarlyFinish : earlyFinish0;
            // проверка если > projectLateFinish
            const earlyFinish2 =
              earlyFinish1 > projectLateFinish ? projectLateFinish : earlyFinish1;
            setStateFinish({ ...stateFinish, earlyFinish: earlyFinish2 });
          }}
        />
        <TextField
          inputRef={refFinishFinish}
          id="date-picker-finish-finish"
          inputProps={{
            min: projectEarlyFinishYYYYMMDD,
            max: projectLateFinishYYYYMMDD,
          }}
          label="по"
          type="date"
          defaultValue={selectedLateFinishYYYYMMDD}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const lateFinish0 = moment.utc(e.target.value).valueOf();
            // проверка если > projectLateFinish
            const lateFinish1 = lateFinish0 > projectLateFinish ? projectLateFinish : lateFinish0;
            // проверка если < projectEarlyFinish
            const lateFinish2 = lateFinish1 < projectEarlyFinish ? projectEarlyFinish : lateFinish1;
            setStateFinish({
              ...stateFinish,
              lateFinish: lateFinish2,
            });
          }}
        />
      </div>
      <ButtonBadge
        filterType={filtersTypes.filterByFinishDate}
        onClickFunc={() => {
          props.setFilter({
            attr: {
              earlyFinish: stateFinish.earlyFinish,
              lateFinish: stateFinish.lateFinish,
            },
            filterType: filtersTypes.filterByFinishDate,
          });
        }}
      ></ButtonBadge>
    </ListItem>
  );
}
export default connect(null, { setFilter })(SearchFinishes);
