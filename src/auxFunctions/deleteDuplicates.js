export default (fullData, whatToFind) => {
  const arrayOfPath = whatToFind.split(".");
  arrayOfPath.shift();

  return [
    ...fullData
      .map((el) => {
        const f = (el, arrayOfPath) => {
          const stage = arrayOfPath.shift();
          if (stage && arrayOfPath.length > 0) {
            return f(el[stage], arrayOfPath);
          }
          return el[stage];
        };
        return f(el, [...arrayOfPath]);
      })
      .filter((e, i, arr) => arr.indexOf(e) === i),
  ];
};
