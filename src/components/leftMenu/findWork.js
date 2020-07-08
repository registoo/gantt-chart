import React from "react";
import VirtualizedList from "./components/virtualizedList.js";
import { connect } from "react-redux";
import { setFilter } from "../../redux/mainReducer/action";
import filtersTypes from "../../redux/mainReducer/dataFilters/typesOfFilters.js";

const FindWork = (props) => {
  return (
    <VirtualizedList
      {...props}
      limitTags={2}
      selfId={"FindWork"}
      filterType={filtersTypes.filterByWorks}
      label="Works"
    />
  );
};
const getState = (state) => {
  return {
    displayedInputData: state.mainReducer.dataSpec.filters.pickedWorksIds,
    localFullIds: state.mainReducer.ids.fullIds,
    localFullData: state.mainReducer.fullData,
    localFilteredData: state.mainReducer.dataSpec.filters.filteredData,
    localFilteredIds: state.mainReducer.dataSpec.filters.filteredIds,
  };
};
export default connect(getState, { setFilter })(FindWork);
