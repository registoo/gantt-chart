import d3TimeFormatLocale from "../../../../../auxFunctions/d3TimeFormatLocale.js";

export default (pixelsInOneDay) => {
  const positionX = (count) => (pixelsInOneDay * count) / 2;
  const timeFormat = (d, d3TimeFormat) => d3TimeFormatLocale.format(d3TimeFormat)(d);
  // {
  //   switch (d3TimeFormat) {
  //     case "month":
  //       return d3TimeFormatLocale.format(d3TimeFormat)(d);
  //       break;
  //     case "week":
  //       return d3TimeFormatLocale.format(d3TimeFormat)(d);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  return { positionX, timeFormat };
};
