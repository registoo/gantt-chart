import convertLength from "to-px";
import setTimeFormat from "./setTimeFormat.js";

export default (d, period, pixelsInOneDay, count) =>
  pixelsInOneDay * count > convertLength(`${setTimeFormat(d, period).length}ch`);
