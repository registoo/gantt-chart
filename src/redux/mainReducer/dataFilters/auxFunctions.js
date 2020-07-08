import { rowHasError } from "../../../auxFunctions";
import deleteDuplicates from "../../../auxFunctions/deleteDuplicates.js";
import filters from "./filters";
import typesOfFilters from "./typesOfFilters";

export const getData = (obj) => {
  const selectedData = obj.selectedData ? obj.selectedData : [];
  const selectedIds = obj.selectedIds ? obj.selectedIds : [];
  const serializedFilters1 = [...obj.serializedFilters];
  const firstElem = serializedFilters1.shift();
  const attr = firstElem.attr;
  delete obj.serializedFilters;
  const filteredData = filters[firstElem.filterType]({ ...obj, attr, selectedData, selectedIds });
  if (serializedFilters1.length > 0) {
    return getData({ serializedFilters: serializedFilters1, ...filteredData });
  }
  return filteredData;
};

// делает список работ для инпута поиска работ
export const getListOfWorksForSearcherInput = (obj) => {
  const serializedFiltersWithoutWorkFilter = obj.serializedFilters.filter((el) => {
    return !(el.filterType === typesOfFilters.filterByWorks);
  });
  if (serializedFiltersWithoutWorkFilter.length === 0) {
    return obj.fullData.map((d) =>
      rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
    );
  } else {
    return getData({
      serializedFilters: serializedFiltersWithoutWorkFilter,
      fullData: obj.fullData,
    }).selectedIds;
  }
};

// делает список работ для инпута поиска СПО
export const getListOfSPOForSearcherInput = (obj) => {
  const serializedFiltersWithoutSPOFilter = obj.serializedFilters.filter((el) => {
    return !(el.filterType === typesOfFilters.filterBySPO);
  });
  if (serializedFiltersWithoutSPOFilter.length === 0) {
    return obj.listOfSPO;
  } else {
    const selectedData = getData({
      serializedFilters: serializedFiltersWithoutSPOFilter,
      fullData: obj.fullData,
    }).selectedData;
    return deleteDuplicates(selectedData, "el.data.SPO.formattedText");
  }
};
