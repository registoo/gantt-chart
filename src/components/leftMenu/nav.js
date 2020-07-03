import React from "react";
import Badge from "@material-ui/core/Badge";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StorageIcon from "@material-ui/icons/Storage";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { connect } from "react-redux";

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
          props.filteredByWorks ? (
            <Badge color="secondary" badgeContent=" ">
              <StorageIcon />
            </Badge>
          ) : (
            <StorageIcon />
          )
        }
      />
      <BottomNavigationAction label="Dates" icon={<DateRangeIcon />} />
    </BottomNavigation>
  );
}

const getState = (state) => {
  return {
    filteredByWorks: state.mainReducer.dataSpec.filteredByWorks,
  };
};

export default connect(getState)(f);
