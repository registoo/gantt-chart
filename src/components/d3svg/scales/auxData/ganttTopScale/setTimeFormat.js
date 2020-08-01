import d3TimeFormatLocale from "../../../../../auxFunctions/d3TimeFormatLocale.js";
import moment from "moment";

// выбираем период
export default (d, period, duration) => {
  switch (period) {
    case "month":
      if (duration) {
        return `${d3TimeFormatLocale.format("%d")(d)}-${d3TimeFormatLocale.format("%d")(
          moment.utc(d).add(duration - 1, "day")
        )}`;
      } else {
        return d3TimeFormatLocale.format("%B")(d);
      }
    case "shortMonth":
      return d3TimeFormatLocale.format("%b")(d);
    case "week":
      return `${d3TimeFormatLocale.format("%d")(d)}-${d3TimeFormatLocale.format("%d")(
        moment.utc(d).add(duration - 1, "day")
      )}`;
    case "day":
      return d3TimeFormatLocale.format("%d")(d);
    default:
      break;
  }
};
