import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import SlideshowIcon from "@material-ui/icons/Slideshow";

const StyledBadgeCalendar = withStyles((theme) => ({
  badge: {
    right: 6,
    top: 6,
  },
}))(Badge);

const calendarBadge = (props) => {
  let i = -1;
  props.serializedFilters.find((e, index) => {
    if (e.filterType === props.filterType) {
      i = index + 1;
    }
    return false;
  });

  const result =
    i >= 0 ? (
      <ListItemIcon>
        <IconButton color="primary" aria-label="apply dates" onClick={props.onClickFunc}>
          <StyledBadgeCalendar color="primary" badgeContent={i}>
            <Tooltip title={`№${i} в очереди фильтров по дате`}>
              <SlideshowIcon fontSize="large" />
            </Tooltip>
          </StyledBadgeCalendar>
        </IconButton>
      </ListItemIcon>
    ) : (
      <ListItemIcon>
        <IconButton color="primary" aria-label="apply dates" onClick={props.onClickFunc}>
          <Tooltip title="применить фильтр">
            <SlideshowIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      </ListItemIcon>
    );
  return result;
};

const getState = (state) => {
  return {
    filtersIds: state.mainReducer.dataSpec.filters.filtersIds,
    serializedFilters: state.mainReducer.dataSpec.filters.serializedFilters,
  };
};
export default connect(getState)(calendarBadge);
