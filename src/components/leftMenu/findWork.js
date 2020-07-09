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
      label="Выберите работы"
    />
  );
};
const getState = (state) => {
  return {
    options: state.mainReducer.dataSpec.filters.worksFilter.listOfWorksForSearcherInput,
    value: state.mainReducer.dataSpec.filters.worksFilter.pickedWorksIds,
  };
};
export default connect(getState, { setFilter })(FindWork);
