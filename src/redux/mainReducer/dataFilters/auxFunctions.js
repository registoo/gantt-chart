import { rowHasError } from "../../../auxFunctions";
import { deleteDuplicates } from "../../../auxFunctions/hierarchy";
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
    return obj.hierarchyFullData.children.map((d) =>
      rowHasError(d.data.data) ? d.data.data.isError.formattedText : d.data.id
    );
  } else {
    return getData({
      serializedFilters: serializedFiltersWithoutWorkFilter,
      hierarchyFullData: obj.hierarchyFullData,
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
      hierarchyFullData: obj.hierarchyFullData,
    }).selectedData;
    return deleteDuplicates(selectedData, "el.data.SPO.formattedText", "arr");
  }
};
