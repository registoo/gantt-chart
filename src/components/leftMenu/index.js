import React from "react";
import Search from "./findWork.js";
import DateFilter from "./dateFilter.js";
import FindSPO from "./findSPO.js";
import NavPanel from "./nav.js";
import FilterPercentage from "./filterPercentage.js";
import { connect } from "react-redux";

const localChildren = (d) => {
  switch (d) {
    case 0:
      return <Search />;
    case 1:
      return <DateFilter />;
    case 2:
      return <FindSPO />;
    case 3:
      return <FilterPercentage />;
    default:
      return "error";
  }
};

function SimpleBottomNavigation(props) {
  const [value, setValue] = React.useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: props.width,
        width: props.width,
        minWidth: props.width,
        marginRight: props.margin.right,
        marginLeft: props.margin.right,
        marginTop: props.margin.top,
      }}
    >
      <NavPanel value={value} setValue={setValue} />
      <div>{localChildren(value)}</div>
    </div>
  );
}

const getState = (state) => {
  return {
    width: state.mainReducer.sizes.sizesLeftMenu.width,
    margin: state.mainReducer.sizes.sizesLeftMenu.margin,
  };
};

export default connect(getState)(SimpleBottomNavigation);
