import { rowHasError } from "../../../../auxFunctions";

export default (obj) => {
  const data = obj.selectedData.length > 0 ? obj.selectedData : obj.fullData;

  const filteredData = data.filter((el) => {
    if (rowHasError(el.data)) return false;
    return (
      el.data.start.dateInMillisecons >= obj.attr.earlyDate &&
      el.data.start.dateInMillisecons <= obj.attr.lateDate
    );
  });
  const filteredIds = filteredData.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );
  return {
    ...obj,
    selectedData: filteredData,
    selectedIds: filteredIds,
  };
};
