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
  const from = props.dates.from;
  const to = props.dates.to;
  const initialFinishState = {
    earlyFinish: projectEarlyFinish,
    lateFinish: projectLateFinish,
  };
  const [stateFinish, setStateFinish] = useState({ ...initialFinishState });
  const [stateError, setStateError] = useState({
    boolEarlyFinish: false,
    textEarlyFinish: "",
    boolLateFinish: false,
    textLateFinish: "",
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
              setStateError({ ...stateError, boolEarlyFinish: false, boolLateFinish: false });
              setStateFinish({ ...initialFinishState });
              props.setFilter({
                attr: { reset: true },
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
          error={stateError.boolEarlyFinish}
          helperText={stateError.boolEarlyFinish ? stateError.textEarlyFinish : undefined}
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
            setStateError({ ...stateError, boolEarlyFinish: false });
            const earlyFinish = moment.utc(e.target.value).valueOf();
            setStateFinish({ ...stateFinish, earlyFinish });
          }}
        />
        <TextField
          error={stateError.boolLateFinish}
          helperText={stateError.boolLateFinish ? stateError.textLateFinish : undefined}
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
            setStateError({ ...stateError, boolLateFinish: false });
            const lateFinish = moment.utc(e.target.value).valueOf();
            setStateFinish({ ...stateFinish, lateFinish });
          }}
        />
      </div>
      <ButtonBadge
        filterType={filtersTypes.filterByFinishDate}
        onClickFunc={() => {
          if (stateFinish.earlyFinish < from) {
            setStateError({
              ...stateError,
              boolEarlyFinish: true,
              boolLateFinish: false,
              textEarlyFinish: `Дата меньше старта проекта ${moment
                .utc(from)
                .format("DD-MM-YYYY")}`,
            });
            return;
          } else if (stateFinish.earlyFinish > to) {
            setStateError({
              ...stateError,
              boolEarlyFinish: true,
              boolLateFinish: false,
              textEarlyFinish: `Дата больше финиша проекта ${moment.utc(to).format("DD-MM-YYYY")}`,
            });
            return;
          } else if (stateFinish.lateFinish < stateFinish.earlyFinish) {
            setStateError({
              ...stateError,
              boolLateFinish: true,
              textLateFinish: `Проверьте даты. Поиск начинается с: ${moment
                .utc(stateFinish.earlyFinish)
                .format("DD-MM-YYYY")}`,
            });
            return;
          }
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
