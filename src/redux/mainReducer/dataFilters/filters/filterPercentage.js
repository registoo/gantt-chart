export default (obj) => {
  const from = +obj.attr.from;
  const to = +obj.attr.to;
  const selectedData =
    obj.selectedData.length > 0
      ? obj.selectedData.filter((e) =>
          e.data.data.isError
            ? false
            : e.data.data.percentComplete.formattedText >= from &&
              e.data.data.percentComplete.formattedText <= to
        )
      : obj.hierarchyFullData.children.filter((e) =>
          e.data.data.isError
            ? false
            : e.data.data.percentComplete.formattedText >= from &&
              e.data.data.percentComplete.formattedText <= to
        );
  const selectedIds = selectedData.map((d) => d.data.data.jobName.formattedText);

  return {
    ...obj,
    selectedData,
    selectedIds,
    percentageSelected: { from, to },
    selectedPercentageFilter: obj.attr.optionsType,
  };
};
