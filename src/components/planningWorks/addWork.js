export default (hierarchyDisplayedData, lvl4ConfirmEnter) => {
  const child = hierarchyDisplayedData[0].children[0];
  console.log(hierarchyDisplayedData[0].children);
  hierarchyDisplayedData[0].children.push(child);
  lvl4ConfirmEnter();
};
