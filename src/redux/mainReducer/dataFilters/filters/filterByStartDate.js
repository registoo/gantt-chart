import { rowHasError } from "../../../../auxFunctions";

export default (obj) => {
  const data = obj.selectedData.length > 0 ? obj.selectedData : obj.hierarchyFullData.children;

  const filteredData = data.filter((el) => {
    if (rowHasError(el.data.data)) return false;
    return (
      el.data.data.start.dateInMillisecons >= obj.attr.earlyDate &&
      el.data.data.start.dateInMillisecons <= obj.attr.lateDate
    );
  });
  const filteredIds = filteredData.map((d) =>
    rowHasError(d.data.data) ? d.data.data.isError.formattedText : d.data.id
  );
  return {
    ...obj,
    selectedData: filteredData,
    selectedIds: filteredIds,
  };
};
