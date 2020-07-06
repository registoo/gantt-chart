import { rowHasError } from "../../../../auxFunctions";
import moment from "moment";

export default (obj) => {
  const data = obj.selectedData
    ? obj.selectedData
    : obj.filteredData
    ? obj.filteredData
    : obj.fullData;
  const filteredData = data.filter((el) => {
    if (rowHasError(el.data)) return false;
    return (
      moment.utc(el.data.finish.dateInMillisecons).startOf("day").valueOf() >=
        obj.attr.earlyFinish &&
      moment.utc(el.data.finish.dateInMillisecons).startOf("day").valueOf() <= obj.attr.lateFinish
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
