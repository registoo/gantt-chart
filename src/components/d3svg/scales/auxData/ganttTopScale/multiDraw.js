import d3TimeFormatLocale from "../../../../../auxFunctions/d3TimeFormatLocale.js";
import { d3TimeFormatFullMonth, d3TimeFormatDay } from "./tickConstants.js";

export default (pixelsInOneDay) => {
  const positionX = (count) => (pixelsInOneDay * count) / 2;
  const timeFormat = (d, period) => {
    switch (period) {
      case "month":
        return d3TimeFormatLocale.format(d3TimeFormatFullMonth)(d);
      case "week":
        return d3TimeFormatLocale.format(d3TimeFormatDay)(d);
      default:
        break;
    }
  };

  return { positionX, timeFormat };
};
