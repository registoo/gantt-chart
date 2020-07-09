import { rowHasError } from "../../../../auxFunctions";
import moment from "moment";

export default (obj) => {
  const data = obj.selectedData.length > 0 ? obj.selectedData : obj.fullData;
  const filteredData = data.filter((el) => {
    if (rowHasError(el.data)) return false;
    const workStart = el.data.start.dateInMillisecons;
    const workFinish = moment.utc(el.data.finish.dateInMillisecons).startOf("day").valueOf();
    if (workStart >= obj.attr.earlyDate && workStart <= obj.attr.lateDate) {
      return true;
    } else if (workFinish <= obj.attr.lateDate && workFinish >= obj.attr.earlyDate) {
      return true;
    } else {
      return false;
    }
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
