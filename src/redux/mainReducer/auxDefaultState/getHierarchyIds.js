import { rowHasError } from "../../../auxFunctions";

export default (hierarchyDisplayedData) =>
  hierarchyDisplayedData.map((d) =>
    rowHasError(d.data.data) ? d.data.data.isError.formattedText : d.data.id
  );
