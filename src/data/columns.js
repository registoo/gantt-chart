const columns = {
  colJobName: { inner: "jobName", outer: "Название КС" },
  colStart: { inner: "start", outer: "Старт" },
  colFinish: { inner: "finish", outer: "Финиш" },
  colPredecessor: { inner: "predecessor", outer: "Предшественник" },
  colNameRus: { inner: "nameRus", outer: "Наименование работы RUS" },
  colNameEng: { inner: "nameEng", outer: "Наименование работы ENG" },
  colIsError: { inner: "isError", outer: "Название КС" },
  colSPO: { inner: "SPO", outer: "СПО" },
  colPercentComplete: { inner: "percentComplete", outer: "% ФО" },
};

const innerNames = Object.keys(columns).reduce((acc, el) => {
  acc[el] = columns[el].inner;
  return acc;
}, {});

const outerNames = Object.keys(columns).reduce((acc, el) => {
  if (el === "colIsError") return acc;
  acc.push({ [columns[el].inner]: columns[el].outer });
  return acc;
}, []);

export default {
  inner: { ...innerNames },
  outer: outerNames,
};
