export default (obj) => {
  return {
    ...obj,
    selectedData: obj.attr.selectedData,
    selectedIds: obj.attr.selectedIds,
    pickedSPO: obj.attr.selectedSPO,
  };
};
