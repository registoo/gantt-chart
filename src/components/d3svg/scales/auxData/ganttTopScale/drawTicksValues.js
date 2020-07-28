import * as d3 from "d3";
import moment from "moment";
import convertLength from "to-px";
import d3TimeFormatLocale from "../../../../../auxFunctions/d3TimeFormatLocale.js";

// period - "month" || "week" || "day"
export default (period, xAxis, counts, pixelsInOneDay, multiDraw) =>
  xAxis
    .ticks(d3.utcDay)
    .tickFormat((d, i, arr) => {
      // читаем весь массив тиков и считаем их
      if (i === 0) {
        [...arr]
          .map((el) => moment.utc(el.__data__).startOf(period).valueOf())
          .forEach((x, i) => {
            // startPosition - первый найденный день в отображаемом массиве; count - количество найденных
            counts[x] = counts[x]
              ? { ...counts[x], count: counts[x].count + 1 }
              : { startPosition: i, count: 1 };
          });
      }
      const dateInMS = moment.utc(d).startOf(period).valueOf();

      // проверка на влезание слова
      const wordBreaks = (d, d3TimeFormat) =>
        pixelsInOneDay * counts[dateInMS].count >
        convertLength(`${multiDraw.timeFormat(d, d3TimeFormat).length}ch`);

      if (counts[dateInMS].startPosition === i) {
        switch (period) {
          case "month": {
            // проверка, влезает ли полное наименование периода
            if (wordBreaks(d, period)) return multiDraw.timeFormat(d, period);
            // проверка, влезает ли краткое наименование месяца
            else if (wordBreaks(d, period)) return multiDraw.timeFormat(d, period);
            else return null;
          }
          case "week": {
            const endOfWeek = moment.utc(d).add(6, "d");
            return `${d3TimeFormatLocale.format("%e.%m")(d)}-${d3TimeFormatLocale.format("%e.%m")(
              endOfWeek
            )}`;
          }
          default:
            return null;
        }
      }
    })
    .tickSize(0);
