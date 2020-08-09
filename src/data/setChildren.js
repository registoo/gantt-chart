import { getRandom } from "../auxFunctions";

export default (el, value) => {
  const childrenInit = [];
  childrenInit.length = getRandom(1, 12);
  const newValue = { ...value };
  delete newValue.start;
  delete newValue.finish;
  delete newValue.duration;
  return childrenInit.fill(null).map((e, i) => {
    return { id: el + i, data: { ...newValue }, dengi: getRandom(200000, 3000000) };
  });
};
