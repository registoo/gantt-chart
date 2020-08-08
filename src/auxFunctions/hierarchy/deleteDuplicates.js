export default (hierarchyData, soughtElem) => {
  const total = [];
  hierarchyData.each((e) => {
    if (e.data.name === "root") return;
    const sought = e.data.data[soughtElem] ? e.data.data[soughtElem].formattedText : null;
    total.length === 0 && total.push(sought);
    total.findIndex((e) => e === sought) < 0 && total.push(sought);
  });
};
