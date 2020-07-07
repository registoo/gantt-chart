import rowHasError from "../../../auxFunctions/rowHasError";

export default (row) => {
  console.log("ROW", row.SPO);
  console.log("ROW", row.percentComplete);

  if (rowHasError(row))
    return {
      workName: row.isError.formattedText,
      start: null,
      finish: null,
      nameRus: null,
      nameEng: null,
      SPO: null,
      percentComplete: null,
    };
  return {
    workName: row.jobName.formattedText,
    start: row.start.formattedText,
    finish: row.finish.formattedText,
    nameRus: row.nameRus.formattedText,
    nameEng: row.nameEng.formattedText,
    SPO: row.SPO.formattedText,
    percentComplete: row.percentComplete.formattedText,
  };
};
