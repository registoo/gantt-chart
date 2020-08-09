export default (obj) => {
  const selectedData =
    obj.selectedData.length > 0
      ? obj.selectedData.filter((e) => {
          return e.data.data.isError
            ? false
            : obj.attr.selectedSPO.indexOf(e.data.data.SPO.formattedText) >= 0;
        })
      : obj.hierarchyFullData.children.filter((e) => {
          return e.data.data.isError
            ? false
            : obj.attr.selectedSPO.indexOf(e.data.data.SPO.formattedText) >= 0;
        });

  const selectedIds = selectedData.map((d) => d.data.data.jobName.formattedText);

  return {
    ...obj,
    selectedData,
    selectedIds,
    pickedSPO: obj.attr.selectedSPO,
  };
};
