import * as d3 from "d3";
import moment from "moment";
import { rowHasError } from "../../../auxFunctions";

export default function (props) {
  const projectEarlyStart = d3.min(props.hierarchyFullData.children, (d) => {
    if (rowHasError(d.data.data)) return;
    return d.data.data.start.dateInMillisecons;
  });
  const projectLateStart = d3.max(props.hierarchyFullData.children, (d) => {
    if (rowHasError(d.data.data)) return;
    return d.data.data.start.dateInMillisecons;
  });
  const projectEarlyFinish = moment
    .utc(
      d3.min(props.hierarchyFullData.children, (d) => {
        if (rowHasError(d.data.data)) return;
        return d.data.data.finish.dateInMillisecons;
      })
    )
    .startOf("day");
  const projectLateFinish = moment
    .utc(
      d3.max(props.hierarchyFullData.children, (d) => {
        if (rowHasError(d.data.data)) return;
        return d.data.data.finish.dateInMillisecons;
      })
    )
    .startOf("day");
  const from = projectEarlyStart;
  const to = projectLateFinish;
  const projectEarlyStartYYYYMMDD = moment.utc(projectEarlyStart).format("YYYY-MM-DD");
  const projectLateStartYYYYMMDD = moment.utc(projectLateStart).format("YYYY-MM-DD");
  const projectEarlyFinishYYYYMMDD = moment.utc(projectEarlyFinish).format("YYYY-MM-DD");
  const projectLateFinishYYYYMMDD = moment.utc(projectLateFinish).format("YYYY-MM-DD");
  const selectedEarlyStartYYYYMMDD = moment
    .utc(
      d3.min(props.hierarchySelectedData, (d) => {
        if (rowHasError(d.data.data)) return;
        return d.data.data.start.dateInMillisecons;
      })
    )
    .format("YYYY-MM-DD");
  const selectedLateStartYYYYMMDD = moment
    .utc(
      d3.max(props.hierarchySelectedData, (d) => {
        if (rowHasError(d.data.data)) return;
        return d.data.data.start.dateInMillisecons;
      })
    )
    .format("YYYY-MM-DD");
  const selectedEarlyFinishYYYYMMDD = moment
    .utc(
      d3.min(props.hierarchySelectedData, (d) => {
        if (rowHasError(d.data.data)) return;
        return d.data.data.finish.dateInMillisecons;
      })
    )
    .format("YYYY-MM-DD");
  const selectedLateFinishYYYYMMDD = moment
    .utc(
      d3.max(props.hierarchySelectedData, (d) => {
        if (rowHasError(d.data.data)) return;
        return d.data.data.finish.dateInMillisecons;
      })
    )
    .format("YYYY-MM-DD");

  return {
    projectEarlyStart,
    projectLateStart,
    projectEarlyFinish,
    projectLateFinish,
    from,
    to,
    projectEarlyStartYYYYMMDD,
    projectLateStartYYYYMMDD,
    projectEarlyFinishYYYYMMDD,
    projectLateFinishYYYYMMDD,
    selectedEarlyStartYYYYMMDD,
    selectedLateStartYYYYMMDD,
    selectedEarlyFinishYYYYMMDD,
    selectedLateFinishYYYYMMDD,
  };
}
