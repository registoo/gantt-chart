import getRandom from "../auxFunctions/getRandom.js";

export default (el, value) => {
  const childrenInit = [];
  childrenInit.length = getRandom(1, 12);
  const newValue = { ...value };
  delete newValue.start;
  delete newValue.finish;
  delete newValue.duration;
  return childrenInit.fill(null).map((e, i) => {
    return { id: el + i, data: { ...newValue } };
  });
};
