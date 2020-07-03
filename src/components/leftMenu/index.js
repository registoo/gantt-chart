import React from "react";
import Search from "./findWork.js";
import DateFilter from "./dateFilter.js";
import NavPanel from "./nav.js";

const localChildren = (d) => {
  switch (d) {
    case 0:
      return <Search />;
    case 1:
      return <DateFilter />;
    default:
      return "error";
  }
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
        marginTop: 10,
      }}
    >
      <NavPanel value={value} setValue={setValue} />
      <div>{localChildren(value)}</div>
    </div>
  );
}
