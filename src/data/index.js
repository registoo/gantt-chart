import data from "./excel.json";
import dataWorker from "./dataWorker.js";
import rowHasError from "../auxFunctions/rowHasError";
import moment from "moment";
import * as d3 from "d3";

// Обозначение столбов с данными
const nameCell = "A";
const startCell = "B";
const finishCell = "C";
const predecessorCell = "D";
const nameRus = "E";
const nameEng = "F";

// headRow - количество строк сверху таблицы Excel с общими данными,
// которые не надо учитывать в результирующей data
const headRow = 1;

const keys = Object.keys(data);

const obj = keys.reduce(function (acc, el) {
  // разбивка номера ячейки на буквенную и числовую части
  const rowNumberReg = /\d+/.exec(el);
  const colLiterReg = /\D/.exec(el);

  // пропускаем первую строчку
  if (rowNumberReg) {
    const rowNumber = rowNumberReg[0];
    const colLiter = colLiterReg[0];

    // пропускаем первую строку с шапкой
    if (+rowNumber === headRow) {
      return acc;
    } else {
      // смотрим что за столбик и добавляем данные в результирующий объект
      switch (colLiter) {
        case nameCell:
          dataWorker("jobName", acc, data, el, rowNumber);
          break;
        case startCell:
          dataWorker("start", acc, data, el, rowNumber);
          break;
        case finishCell:
          dataWorker("finish", acc, data, el, rowNumber);
          break;
        case predecessorCell:
          dataWorker("predecessor", acc, data, el, rowNumber);
          break;
        case nameRus:
          dataWorker("nameRus", acc, data, el, rowNumber);
          break;
        case nameEng:
          dataWorker("nameEng", acc, data, el, rowNumber);
          break;
        default:
          dataWorker("isError", acc, data, el, rowNumber);
          break;
      }
    }
  }

  return acc;
}, {});

//добавляем длительность
const addDuration = (el) => {
  const millisecondsToDate = (ms) => moment.utc(ms);
  const result = Object.assign({}, el);
  const start = millisecondsToDate(result.start.dateInMillisecons);
  const finish = millisecondsToDate(result.finish.dateInMillisecons);
  const delta = moment.duration(finish.diff(start)).get("d");
  result.duration = delta + 1;
  return result;
};

// для упрощения в reducer указан объект. Превращает объект в массив, d3 нужен массив
// добавить проверку на одинаковые ID и выдавать ошибку
const IDAddedToObj = () => {
  let errorNumber = 0;
  const result = Object.entries(obj).reduce((acc, [key, value]) => {
    if (rowHasError(value)) {
      acc[`${value.isError.cellType}#${++errorNumber}`] = value;
      return acc;
    } else {
      const durationAdded = addDuration(value);
      acc[durationAdded.jobName.formattedText] = durationAdded;
      return acc;
    }
  }, {});
  return result;
};

const resultData = IDAddedToObj();

const arrayOfIds = d3.keys(resultData);
const resultArray = arrayOfIds.map((el) => {
  const value = resultData[el];
  return { id: el, data: value };
});

export default resultArray;
