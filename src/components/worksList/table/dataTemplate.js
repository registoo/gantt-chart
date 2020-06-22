import rowHasError from "../../../auxFunctions/rowHasError";

export default (row) => {
  if (rowHasError(row))
    return {
      KKS: row.isError.formattedText,
      start: null,
      finish: null,
      nameRus: null,
      nameEng: null,
    };
  return {
    KKS: row.jobName.formattedText,
    start: row.start.formattedText,
    finish: row.finish.formattedText,
    nameRus: row.nameRus.formattedText,
    nameEng: row.nameEng.formattedText,
  };
};
