import { rowHasError } from "../../../../auxFunctions";
import moment from "moment";

export default (obj) => {
  const data = obj.selectedData.length > 0 ? obj.selectedData : obj.hierarchyFullData;
  const filteredData = data.filter((el) => {
    if (rowHasError(el.data.data)) return false;
    return (
      moment.utc(el.data.data.finish.dateInMillisecons).startOf("day").valueOf() >=
        obj.attr.earlyDate &&
      moment.utc(el.data.data.finish.dateInMillisecons).startOf("day").valueOf() <=
        obj.attr.lateDate
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
