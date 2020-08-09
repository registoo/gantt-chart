export default (obj) => {
  console.log("byWorks", obj);
  const selectedData =
    obj.selectedData.length > 0
      ? obj.selectedData.filter((e) =>
          e.data.data.isError
            ? obj.attr.selectedIds.indexOf(e.data.data.isError.formattedText) >= 0
            : obj.attr.selectedIds.indexOf(e.data.id) >= 0
        )
      : obj.hierarchyFullData.children.filter((e) =>
          e.data.data.isError
            ? obj.attr.selectedIds.indexOf(e.data.data.isError.formattedText) >= 0
            : obj.attr.selectedIds.indexOf(e.data.id) >= 0
        );
  console.log("selectedData", selectedData);
  return {
    ...obj,
    selectedData,
    selectedIds: obj.attr.selectedIds,
    pickedWorksIds: obj.attr.selectedIds,
  };
};
