import React from "react";
import VirtualizedList from "./components/virtualizedList.js";
import { connect } from "react-redux";
import { setFilter } from "../../redux/mainReducer/action";
import filtersTypes from "../../redux/mainReducer/dataFilters/typesOfFilters.js";

const FindSPO = (props) => {
  return (
    <VirtualizedList
      {...props}
      limitTags={5}
      selfId={"FindSPO"}
      filterType={filtersTypes.filterBySPO}
      label="Выберите СПО"
    />
  );
};
const getState = (state) => {
  return {
    options: state.fullDataReducer.someData.listOfSPO,
    value: state.mainReducer.filters.SPOFilter.pickedSPO,
    hierarchyFullData: state.fullDataReducer.fullData,
    hierarchyFullIds: state.fullDataReducer.fullIds,
  };
};
export default connect(getState, { setFilter })(FindSPO);
