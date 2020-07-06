import React from "react";
import Badge from "@material-ui/core/Badge";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StorageIcon from "@material-ui/icons/Storage";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

function f(props) {
  return (
    <BottomNavigation
      value={props.value}
      onChange={(event, newValue) => {
        props.setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Works"
        icon={
          props.filterByWorks ? (
            <Tooltip title={`выбрано работ: ${props.selectedIds.length}`}>
              <Badge color="secondary" badgeContent={props.selectedIds.length}>
                <StorageIcon />
              </Badge>
            </Tooltip>
          ) : (
            <StorageIcon />
          )
        }
      />
      <BottomNavigationAction
        label="Dates"
        icon={
          props.filterByStartDate || props.filterByFinishDate || props.filterByPerformedDate ? (
            <Tooltip title="имеется активный фильтр">
              <Badge color="secondary" variant="dot">
                <DateRangeIcon />
              </Badge>
            </Tooltip>
          ) : (
            <DateRangeIcon />
          )
        }
      />
    </BottomNavigation>
  );
}

const getState = (state) => {
  return {
    filterByWorks: state.mainReducer.dataSpec.filters.filtersIds.filterByWorks,
    filterByStartDate: state.mainReducer.dataSpec.filters.filtersIds.filterByStartDate,
    filterByFinishDate: state.mainReducer.dataSpec.filters.filtersIds.filterByFinishDate,
    filterByPerformedDate: state.mainReducer.dataSpec.filters.filtersIds.filterByPerformedDate,
    selectedIds: state.mainReducer.ids.selectedIds,
  };
};

export default connect(getState)(f);
