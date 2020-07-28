export default (obj) => {
  const selectedData =
    obj.selectedData.length > 0
      ? obj.selectedData.filter((e) =>
          e.data.isError
            ? obj.attr.selectedIds.indexOf(e.data.isError.formattedText) >= 0
            : obj.attr.selectedIds.indexOf(e.id) >= 0
        )
      : obj.fullData.filter((e) =>
          e.data.isError
            ? obj.attr.selectedIds.indexOf(e.data.isError.formattedText) >= 0
            : obj.attr.selectedIds.indexOf(e.id) >= 0
        );

  return {
    ...obj,
    selectedData,
    selectedIds: obj.attr.selectedIds,
    pickedWorksIds: obj.attr.selectedIds,
  };
};
