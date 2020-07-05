export default (obj) => {
  return {
    ...obj,
    selectedData: obj.attr.selectedData,
    selectedIds: obj.attr.selectedIds,
    pickedWorksIds: obj.attr.selectedIds,
  };
};
