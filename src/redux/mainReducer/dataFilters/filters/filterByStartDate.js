import { rowHasError } from "../../../../auxFunctions";

export default (obj) => {
  const data = obj.selectedData
    ? obj.selectedData
    : obj.filteredData
    ? obj.filteredData
    : obj.fullData;
  const filteredData = data.filter((el) => {
    if (rowHasError(el.data)) return false;
    return (
      el.data.start.dateInMillisecons >= obj.attr.earlyStart &&
      el.data.start.dateInMillisecons <= obj.attr.lateStart
    );
  });
  const filteredIds = filteredData.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );
  return {
    ...obj,
    filteredData,
    filteredIds,
    selectedData: filteredData,
    selectedIds: filteredIds,
  };
};
