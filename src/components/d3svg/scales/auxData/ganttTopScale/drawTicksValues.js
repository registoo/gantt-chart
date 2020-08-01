import * as d3 from "d3";
import moment from "moment";
import convertLength from "to-px";
import setTimeFormat from "./setTimeFormat.js";

// period - "month" || "week" || "day"
export default (period, xAxis, counts, pixelsInOneDay) =>
  xAxis
    .ticks(d3.utcDay)
    .tickFormat((d, i0, arr) => {
      // читаем весь массив тиков и считаем их
      if (i0 === 0) {
        [...arr]
          .map((el) => {
            if (period !== "week") {
              return moment.utc(el.__data__).startOf(period).valueOf();
            }
            const startOfWeek = moment.utc(el.__data__).startOf(period).valueOf();
            const firstDrawingElem = moment.utc(d).startOf(period).valueOf();
            const result = startOfWeek < firstDrawingElem ? firstDrawingElem : startOfWeek;
            return result;
          })
          .forEach((x, i1) => {
            // startPosition - первый найденный день в отображаемом массиве
            // count - количество отображаемых дней
            counts[x] = counts[x]
              ? { ...counts[x], count: counts[x].count + 1 }
              : { startPosition: i1, count: 1 };
          });
      }
      const dateInMS = moment.utc(d).startOf(period).valueOf();

      // проверка на влезание слова
      const wordBreaks = (d, period) =>
        pixelsInOneDay * counts[dateInMS].count >
        convertLength(`${setTimeFormat(d, period).length}ch`);

      if (counts[dateInMS].startPosition === i0) {
        switch (period) {
          case "month": {
            // проверка, влезает ли полное наименование периода
            if (wordBreaks(d, period)) return setTimeFormat(d, period);
            // проверка, влезает ли краткое наименование месяца
            else if (wordBreaks(d, "shortMonth")) return setTimeFormat(d, "shortMonth");
            else return null;
          }
          case "week": {
            // проверка, влезает ли полное наименование периода
            if (wordBreaks(d, period)) return setTimeFormat(d, period, counts[dateInMS].count);
            break;
          }
          case "day": {
            return setTimeFormat(d, period);
          }
          default:
            return null;
        }
      }
    })
    .tickSize(0);
