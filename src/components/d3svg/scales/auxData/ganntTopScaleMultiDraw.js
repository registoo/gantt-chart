import d3TimeFormatLocale from "../../../../auxFunctions/d3TimeFormatLocale.js";

export default (pixelsInOneDay) => {
  let positionX;
  let timeFormat;
  positionX = (count) => (pixelsInOneDay * count) / 2;
  timeFormat = (d, d3TimeFormat) => d3TimeFormatLocale.format(d3TimeFormat)(d);
  return { positionX, timeFormat };
};
