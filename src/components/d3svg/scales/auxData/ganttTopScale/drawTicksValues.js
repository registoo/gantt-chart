import * as d3 from "d3";
import moment from "moment";
import setTimeFormat from "./setTimeFormat.js";
import wordBreaks from "./wordBreaks.js";

// period - "month" || "week" || "day"
export default (period, xAxis, counts, pixelsInOneDay, scaleLvl) =>
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

      if (counts[dateInMS].startPosition === i0) {
        switch (period) {
          case "month": {
            // проверка, влезает ли полное наименование периода
            if (scaleLvl === "lowerScale") {
              // при шкалировании нижней полоски до уровня месяца
              if (wordBreaks(d, period, pixelsInOneDay, counts[dateInMS].count)) {
                return setTimeFormat(d, period, counts[dateInMS].count);
              }
              return null;
            } else if (
              wordBreaks(d, period, pixelsInOneDay, counts[dateInMS].count) &&
              counts[dateInMS].count > 2
            ) {
              // проверка верхней шкалы на полный месяц, сделана проверка count>2 т.к. шкала +1ms
              return setTimeFormat(d, period);
            }
            // проверка верхней шкалы на сокращенное название месяца
            else if (
              wordBreaks(d, "shortMonth", pixelsInOneDay, counts[dateInMS].count) &&
              counts[dateInMS].count > 2
            ) {
              return setTimeFormat(d, "shortMonth");
            } else return null;
          }
          case "week": {
            // проверка, влезает ли полное наименование периода
            if (wordBreaks(d, period, pixelsInOneDay, counts[dateInMS].count))
              return setTimeFormat(d, period, counts[dateInMS].count);
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
