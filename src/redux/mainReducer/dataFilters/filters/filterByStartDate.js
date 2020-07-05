import { rowHasError } from "../../../../auxFunctions";

// if (!action.filteredByDate) {
//   return state.previousState ? state.previousState : state;
// }
export default (obj) => {
  console.log("date obj", obj);

  const data = obj.selectedData
    ? obj.selectedData
    : obj.filteredData
    ? obj.filteredData
    : obj.fullData;
  const filteredData = data.filter((el) => {
    if (rowHasError(el.data)) return false;
    return (
      el.data.start.dateInMillisecons >= obj.attr.start &&
      el.data.start.dateInMillisecons <= obj.attr.finish
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
