import { rowHasError } from "../../../../auxFunctions";
import moment from "moment";

export default (obj) => {
  const data = obj.selectedData.length > 0 ? obj.selectedData : obj.hierarchyFullData;
  const filteredData = data.filter((el) => {
    if (rowHasError(el.data.data)) return false;
    const workStart = el.data.data.start.dateInMillisecons;
    const workFinish = moment.utc(el.data.data.finish.dateInMillisecons).startOf("day").valueOf();
    if (workStart >= obj.attr.earlyDate && workStart <= obj.attr.lateDate) {
      return true;
    } else if (workFinish <= obj.attr.lateDate && workFinish >= obj.attr.earlyDate) {
      return true;
    } else {
      return false;
    }
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
