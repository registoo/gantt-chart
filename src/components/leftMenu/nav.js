import React from "react";
import Badge from "@material-ui/core/Badge";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StorageIcon from "@material-ui/icons/Storage";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";

function f(props) {
  return (
    <BottomNavigation
      style={{ alignItems: "flex-start", minHeight: 70 }}
      value={props.value}
      onChange={(event, newValue) => {
        props.setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Работы"
        icon={
          props.filterByWorks ? (
            <Tooltip title={`выбрано работ: ${props.hierarchySelectedIds.length}`}>
              <Badge color="secondary" badgeContent={props.hierarchySelectedIds.length}>
                <StorageIcon />
              </Badge>
            </Tooltip>
          ) : (
            <StorageIcon />
          )
        }
      />
      <BottomNavigationAction
        label="Выбор дат"
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
      <BottomNavigationAction
        label="СПО"
        icon={
          props.filterBySPO ? (
            <Tooltip title="имеется активный фильтр">
              <Badge color="secondary" variant="dot">
                <DirectionsWalkIcon />
              </Badge>
            </Tooltip>
          ) : (
            <DirectionsWalkIcon />
          )
        }
      />
      <BottomNavigationAction
        label="% выполнения"
        icon={
          props.filterPercentage ? (
            <Tooltip title="имеется активный фильтр">
              <Badge color="secondary" variant="dot">
                <DonutLargeIcon />
              </Badge>
            </Tooltip>
          ) : (
            <DonutLargeIcon />
          )
        }
      />
    </BottomNavigation>
  );
}

const getState = (state) => {
  return {
    filterByWorks: state.mainReducer.filters.filtersIds.filterByWorks,
    filterByStartDate: state.mainReducer.filters.filtersIds.filterByStartDate,
    filterByFinishDate: state.mainReducer.filters.filtersIds.filterByFinishDate,
    filterByPerformedDate: state.mainReducer.filters.filtersIds.filterByPerformedDate,
    hierarchySelectedIds: state.mainReducer.ids.hierarchySelectedIds,
    filterPercentage: state.mainReducer.filters.filtersIds.filterPercentage,
    filterBySPO: state.mainReducer.filters.filtersIds.filterBySPO,
  };
};

export default connect(getState)(f);
