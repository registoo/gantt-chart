import getRandom from "../auxFunctions/getRandom.js";

export default (el, value) => {
  const childrenInit = [];
  childrenInit.length = getRandom(1, 12);
  return childrenInit.fill(null).map((e, i) => {
    return { id: el + i, data: value };
  });
};
