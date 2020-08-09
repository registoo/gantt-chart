export default (hierarchyData, soughtElem, typeOfData) => {
  // если hierarchyData является массивом нод
  if (typeOfData === "arr") {
    const arrayOfPath = soughtElem.split(".");
    arrayOfPath.shift();

    return [
      ...hierarchyData
        .map((el0) => {
          const el = el0.data;
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
  } else {
    // если hierarchyData является d3.hierarchyData
    const total = [];
    hierarchyData.each((e) => {
      if (e.data.name === "root") return;
      const sought = e.data.data[soughtElem] ? e.data.data[soughtElem].formattedText : null;
      total.length === 0 && total.push(sought);
      total.findIndex((e) => e === sought) < 0 && total.push(sought);
    });
    return total;
  }
};
