import * as d3 from "d3";
import moment from "moment";

export const brushStart = (node, xScale) => {
  console.log("brushStart", d3.event.sourceEvent.type, node, xScale());
};

export function brushed({ node, xScale, currentChildren, lvl4BrushSelected }) {
  if (d3.event.sourceEvent.type === "brush") return;
  const d0 = d3.event.selection.map(xScale.invert),
    d1 = d0.map(d3.utcDay.round);
  // If empty when rounded, use floor instead.
  if (d1[0] >= d1[1]) {
    d1[0] = +moment.utc(d3.utcDay.floor(d0[0])).format("x");
    d1[1] = +moment.utc(d3.utcDay.offset(d1[0])).subtract(1, "ms").format("x");
  } else {
    d1[0] = +moment.utc(d1[0]).format("x");
    d1[1] = +moment.utc(d1[1]).subtract(1, "ms").format("x");
  }

  d3.select(node).call(d3.event.target.move, d1.map(xScale));
  // магия рисования прямоугольничков поверх брашей
  if (lvl4BrushSelected) {
    const start = {
      cellType: "date",
      dateInMillisecons: d1[0],
      formattedText: moment.utc(d1[0]).format("MM/DD/YY"),
    };
    const finish = {
      cellType: "date",
      dateInMillisecons: d1[1],
      formattedText: moment.utc(d1[1]).format("MM/DD/YY"),
    };
    const lvl4Dates = currentChildren.data.lvl4Dates;
    if (lvl4Dates.length === 0) {
      lvl4Dates.push({ start, finish });
    } else if (true) {
      const q = lvl4Dates.findIndex((el) => {
        const startOld = el.start.dateInMillisecons;
        const startNew = start.dateInMillisecons;
        const finishOld = el.finish.dateInMillisecons;
        const finishNew = finish.dateInMillisecons;
        if (startOld === startNew && finishOld === finishNew) {
          console.log("FALSE");
          return false;
        } else {
          console.log("TRUE");
          console.log(startOld === startNew, startOld, startNew, finishOld, finishNew);
          return true;
        }
      });
      console.log("очерёдность?", q, q < 0);
      const result1 = lvl4Dates.map((el) => {
        const startOld = el.start.dateInMillisecons;
        const startNew = start.dateInMillisecons;
        const finishOld = el.finish.dateInMillisecons;
        const finishNew = finish.dateInMillisecons;
        if (startOld === startNew && finishOld >= finishNew) {
          console.log(1);
          return el;
        } else if (startOld === startNew && finishOld < finishNew) {
          console.log(2);
          return { start, finish };
        } else if (startOld > startNew && finishOld === finishNew) {
          console.log(3);
          return { start, finish };
        } else if (startOld < startNew && finishOld === finishNew) {
          console.log(4);
          return el;
        } else if (startOld < startNew && finishOld < finishNew) {
          console.log(5);
          return [{ start, finish }, el];
        } else if (startOld > startNew && finishOld > finishNew) {
          console.log(6);
          return [{ start, finish }, el];
        } else {
          console.log(7);
          return { start, finish };
        }
      });
      currentChildren.data.lvl4Dates = result1.flat(Infinity);
    }
    currentChildren.data.percentComplete = 0;
  }
}
export const brushEnd = ({ currentChildren, lvl4BrushSelected }) => {
  if (lvl4BrushSelected && !d3.event.selection) {
  }
};
