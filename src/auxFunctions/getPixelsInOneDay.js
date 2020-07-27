import moment from "moment";

export default (SVGwidth, scale) =>
  SVGwidth /
  moment.duration(moment.utc(scale.domain()[1]).diff(moment.utc(scale.domain()[0]))).as("d");
