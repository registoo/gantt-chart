const testKey = (key) => {
  let width = 100;
  let fontSize = 14;
  switch (key) {
    case "nameRus":
    case "nameEng":
      width = 300;
      fontSize = 10;
      break;
    default:
      break;
  }
  return { width, fontSize };
};

const worker = (columns0) => {
  const { columns, boxWidth } = columns0.reduce(
    (acc, colName) => {
      const key = Object.keys(colName)[0];
      const { width, fontSize } = testKey(key);
      const result = {};
      result.key = key;
      result.d = colName[key];
      result.width = width;
      result.fontSize = fontSize;
      result.leftMargin = acc.leftMargin;
      acc.columns.push(result);
      acc.leftMargin += 25 + width;
      acc.boxWidth += 25 + width;
      return acc;
    },
    { leftMargin: 24, boxWidth: 0, columns: [] }
  );
  return { columns, boxWidth };
};
export default worker;
