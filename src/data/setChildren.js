import { getRandom } from "../auxFunctions";

export default (el, value) => {
  const childrenInit = [];
  childrenInit.length = getRandom(1, 12);
  const newValue = { ...value };
  const lvl4Dates = [];
  const brushedData = [];
  return childrenInit.fill(null).map((e, i) => {
    return {
      id: el + i,
      data: {
        ...newValue,
        lvl4Dates,
        brushedData,
        percentComplete: { cellType: "number", formattedText: getRandom(0, 100) },
      },
      dengi: getRandom(200000, 3000000),
    };
  });
};
