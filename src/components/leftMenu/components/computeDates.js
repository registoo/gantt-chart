import * as d3 from "d3";
import moment from "moment";
import { rowHasError } from "../../../auxFunctions";

export default function (props) {
  const projectEarlyStart = d3.min(props.fullData, (d) => {
    if (rowHasError(d.data)) return;
    return d.data.start.dateInMillisecons;
  });
  const projectLateStart = d3.max(props.fullData, (d) => {
    if (rowHasError(d.data)) return;
    return d.data.start.dateInMillisecons;
  });
  const projectEarlyFinish = moment
    .utc(
      d3.min(props.fullData, (d) => {
        if (rowHasError(d.data)) return;
        return d.data.finish.dateInMillisecons;
      })
    )
    .startOf("day");
  const projectLateFinish = moment
    .utc(
      d3.max(props.fullData, (d) => {
        if (rowHasError(d.data)) return;
        return d.data.finish.dateInMillisecons;
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
      d3.min(props.selectedData, (d) => {
        if (rowHasError(d.data)) return;
        return d.data.start.dateInMillisecons;
      })
    )
    .format("YYYY-MM-DD");
  const selectedLateStartYYYYMMDD = moment
    .utc(
      d3.max(props.selectedData, (d) => {
        if (rowHasError(d.data)) return;
        return d.data.start.dateInMillisecons;
      })
    )
    .format("YYYY-MM-DD");
  const selectedEarlyFinishYYYYMMDD = moment
    .utc(
      d3.min(props.selectedData, (d) => {
        if (rowHasError(d.data)) return;
        return d.data.finish.dateInMillisecons;
      })
    )
    .format("YYYY-MM-DD");
  const selectedLateFinishYYYYMMDD = moment
    .utc(
      d3.max(props.selectedData, (d) => {
        if (rowHasError(d.data)) return;
        return d.data.finish.dateInMillisecons;
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
