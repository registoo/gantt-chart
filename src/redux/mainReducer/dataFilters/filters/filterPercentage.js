export default (obj) => {
  const from = +obj.attr.from;
  const to = +obj.attr.to;
  const selectedData =
    obj.selectedData.length > 0
      ? obj.selectedData.filter((e) =>
          e.data.isError
            ? false
            : e.data.percentComplete.formattedText >= from &&
              e.data.percentComplete.formattedText <= to
        )
      : obj.fullData.filter((e) =>
          e.data.isError
            ? false
            : e.data.percentComplete.formattedText >= from &&
              e.data.percentComplete.formattedText <= to
        );

  const selectedIds = selectedData.map((d) => d.data.jobName.formattedText);

  return {
    ...obj,
    selectedData,
    selectedIds,
    percentageSelected: { from, to },
  };
};
