import { deleteDuplicates } from "../../auxFunctions/hierarchy";
import { rowHasError } from "../../auxFunctions";

export default (hierarchyFullData) => {
  const listOfSPO = deleteDuplicates(hierarchyFullData, "SPO");
  const hierarchyFullIds = hierarchyFullData.children.map((d) =>
    rowHasError(d.data.data) ? d.data.data.isError.formattedText : d.data.id
  );
  return { fullData: hierarchyFullData, fullIds: hierarchyFullIds, someData: { listOfSPO } };
};
