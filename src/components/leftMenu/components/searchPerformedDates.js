import React, { useState, useRef } from "react";
import { setFilter } from "../../../redux/mainReducer/action.js";
import { connect } from "react-redux";
import filtersTypes from "../../../redux/mainReducer/dataFilters/typesOfFilters.js";
import moment from "moment";
import ButtonBadge from "./buttonBadge.js";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";

function SearchPerformed(props) {
  const projectEarlyStartYYYYMMDD = props.dates.projectEarlyStartYYYYMMDD;
  const projectLateFinishYYYYMMDD = props.dates.projectLateFinishYYYYMMDD;
  const selectedEarlyStartYYYYMMDD = props.dates.selectedEarlyStartYYYYMMDD;
  const selectedLateFinishYYYYMMDD = props.dates.selectedLateFinishYYYYMMDD;
  const from = props.dates.from;
  const to = props.dates.to;
  const classes = props.classes;
  const refFrom = useRef(null);
  const refTo = useRef(null);
  const initialFinishState = {
    from,
    to,
  };
  const [statePerformed, setStatePerformed] = useState({ ...initialFinishState });
  const [stateError, setStateError] = useState({
    boolFrom: false,
    textFrom: "",
    boolTo: false,
    textTo: "",
  });
  return (
    <ListItem id="listPerformedWork">
      <ListItemIcon>
        <Tooltip title="сброс фильтра">
          <IconButton
            aria-label="refresh"
            onClick={() => {
              setStateError({ ...stateError, boolTo: false, boolFrom: false });
              setStatePerformed({ ...initialFinishState });
              props.setFilter({
                attr: { reset: true },
                filterType: filtersTypes.filterByPerformedDate,
              });
              refFrom.current.value = projectEarlyStartYYYYMMDD;
              refTo.current.value = projectLateFinishYYYYMMDD;
            }}
          >
            <SettingsBackupRestoreIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
      <div>
        <ListItemText>
          Выполняе
          <br />
          мые в период
        </ListItemText>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          error={stateError.boolFrom}
          helperText={stateError.boolFrom ? stateError.textFrom : undefined}
          inputRef={refFrom}
          id="date-picker-performed-start"
          inputProps={{
            min: projectEarlyStartYYYYMMDD,
            max: projectLateFinishYYYYMMDD,
          }}
          label="с"
          type="date"
          defaultValue={selectedEarlyStartYYYYMMDD}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setStateError({ ...stateError, boolFrom: false });
            const from = moment.utc(e.target.value).valueOf();
            setStatePerformed({ ...statePerformed, from });
          }}
        />
        <TextField
          error={stateError.boolTo}
          helperText={stateError.boolTo ? stateError.textTo : undefined}
          inputRef={refTo}
          id="date-picker-performed-finish"
          inputProps={{
            min: projectEarlyStartYYYYMMDD,
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
            setStateError({ ...stateError, boolTo: false });
            const to = moment.utc(e.target.value).valueOf();
            setStatePerformed({ ...statePerformed, to });
          }}
        />
      </div>
      <ButtonBadge
        filterType={filtersTypes.filterByPerformedDate}
        onClickFunc={() => {
          if (statePerformed.from > to) {
            setStateError({
              ...stateError,
              boolFrom: true,
              boolTo: false,
              textFrom: `Дата больше финиша проекта ${moment.utc(to).format("DD-MM-YYYY")}`,
            });
            return;
          } else if (statePerformed.from < from) {
            setStateError({
              ...stateError,
              boolFrom: true,
              boolTo: false,
              textFrom: `Дата меньше старта проекта ${moment.utc(from).format("DD-MM-YYYY")}`,
            });
            return;
          } else if (statePerformed.to < statePerformed.from) {
            setStateError({
              ...stateError,
              boolTo: true,
              textTo: `Проверьте даты. Поиск начинается с: ${moment
                .utc(statePerformed.from)
                .format("DD-MM-YYYY")}`,
            });
            return;
          }
          props.setFilter({
            attr: {
              from: statePerformed.from,
              to: statePerformed.to,
            },
            filterType: filtersTypes.filterByPerformedDate,
          });
        }}
      ></ButtonBadge>
    </ListItem>
  );
}
export default connect(null, { setFilter })(SearchPerformed);
