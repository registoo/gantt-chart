import React, { Fragment } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StorageIcon from "@material-ui/icons/Storage";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Search from "./findWork.js";
import DateFilter from "./dateFilter.js";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        width: 400,
        minWidth: 400,
        marginRight: 10,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Works" icon={<StorageIcon />} />
        <BottomNavigationAction label="Dates" icon={<DateRangeIcon />} />
      </BottomNavigation>
      <div>{f(value)}</div>
    </div>
  );
}

const f = (d) => {
  switch (d) {
    case 0:
      return <Search />;
    case 1:
      return <DateFilter />;
    default:
      return "error";
  }
};
