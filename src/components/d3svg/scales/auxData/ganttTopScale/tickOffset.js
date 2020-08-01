import moment from "moment";
import months from "./monthes.js";
import positionX from "./getPositionX.js";

export default (g, counts, pixelsInOneDay, period, scaleLvl) => {
  g.selectAll(".tick text")
    .attr("font-size", "0.6rem")
    .attr("x", (a, i, arr) => {
      // проверям нарисован ли тик и берём его innerHTML (название месяца, например "Июль" или "июн")
      const drawn = arr[i].innerHTML.length > 0;
      switch (period) {
        case "month":
          if (scaleLvl === "lowerScale") {
            if (drawn) {
              const elem = counts[+moment.utc(a).valueOf()]
                ? counts[+moment.utc(a).valueOf()]
                : counts[+moment.utc(+Object.keys(counts)[0]).valueOf()];
              return positionX(period, pixelsInOneDay, elem.count);
            }
          }
          if (drawn) {
            let result;
            const currentMonthNumber = months[arr[i].innerHTML];
            // пробегаем по counts, берём длину показываемого месяца и расчитываем чтоб по центру рисовалось
            Object.keys(counts).map((dateInMS) => {
              const monthNumberInCounts = +moment.utc(+dateInMS).format("M");
              if (currentMonthNumber === monthNumberInCounts) {
                result = positionX("month", pixelsInOneDay, counts[dateInMS].count);
              }
              return null;
            });
            return result;
          }
          return 0;
        case "week":
          if (drawn) {
            const elem = counts[+moment.utc(a).valueOf()]
              ? counts[+moment.utc(a).valueOf()]
              : counts[+moment.utc(+Object.keys(counts)[0]).valueOf()];
            return positionX(period, pixelsInOneDay, elem.count);
          }
          break;
        case "day":
          return positionX(period, pixelsInOneDay);
        default:
          break;
      }
    })
    // отступ наименования тика от границы шкалы
    .attr("y", -4);
};
