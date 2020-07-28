export default (obj) => {
  const selectedData =
    obj.selectedData.length > 0
      ? obj.selectedData.filter((e) => {
          console.log("e", e);

          return e.data.isError
            ? false
            : obj.attr.selectedSPO.indexOf(e.data.SPO.formattedText) >= 0;
        })
      : obj.fullData.filter((e) => {
          return e.data.isError
            ? false
            : obj.attr.selectedSPO.indexOf(e.data.SPO.formattedText) >= 0;
        });

  const selectedIds = selectedData.map((d) => d.data.jobName.formattedText);

  return {
    ...obj,
    selectedData,
    selectedIds,
    pickedSPO: obj.attr.selectedSPO,
  };
};
