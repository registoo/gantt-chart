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
      label="СПО"
    />
  );
};
const getState = (state) => {
  return {
    displayedInputData: state.mainReducer.dataSpec.filters.pickedSPO,
    localFullIds: state.mainReducer.someData.listOfSPO,
    localFullData: state.mainReducer.fullData,
    localFilteredData: state.mainReducer.dataSpec.filters.filteredData,
    localFilteredIds: state.mainReducer.dataSpec.filters.filteredIds,
  };
};
export default connect(getState, { setFilter })(FindSPO);
