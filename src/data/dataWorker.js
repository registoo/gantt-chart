import moment from "moment";
import columnsData from "./columns.js";

const columns = columnsData.inner;

export default (currentKey, acc, data, el, rowNumber) => {
  // расписываем типы данных Excel
  const getTypes = (elem) => {
    switch (elem) {
      case "b":
        return "boolean";
      case "e":
        return "error";
      case "n":
        return "number";
      case "d":
        return "date";
      case "s":
        return "text";
      case "z":
        return "blank cell";
      default:
        return "error";
    }
  };

  const setCorrectAttr = (currentKey, dateInMillisecons) => {
    // добавляем атрибут при отсутствии ошибок
    switch (currentKey) {
      case acc[rowNumber]:
        // проверка на случай появления ошибки в строке Excel до столбцов строки без ошибки.
        // при появлении какой-бы то ни было ошибки - оставляем только ошибочный ключ строки.
        // --------- переделать проверку ошибок: при наличии ошибки в jobName, добавится как ключ jobName, так и isError в объект строки
        if (acc[rowNumber].hasOwnProperty("isError")) return null;
        break;
      default:
        acc[rowNumber] = {
          ...acc[rowNumber],
          ...{
            [currentKey]: {
              formattedText: data[el].w,
              cellType: getTypes(data[el].t),
            },
          },
        };
        if (dateInMillisecons) {
          acc[rowNumber][currentKey].dateInMillisecons = dateInMillisecons;
        }
        break;
    }
  };

  // хуярим ошибку
  const cellError = (currentKey) => {
    acc[rowNumber] = {
      // для ошибочных строк делаем только ошибочный ключ строки, остальные стираем
      [currentKey]: {
        formattedText: `error at row #${rowNumber}. Data: "${data[el].w}"`,
        cellType: getTypes("e"),
      },
    };
  };

  // основной код функции
  switch (currentKey) {
    case columns.colStart:
      // проверка ячейки "старт" Excel на тип данных date
      if (data[el].t === "d") {
        const dateInMillisecons = moment.utc(data[el].w, "MM/DD/YYYY").format("x");
        setCorrectAttr(currentKey, +dateInMillisecons);
      } else {
        cellError(columns.colIsError, 0, 0);
      }
      break;
    case columns.colFinish:
      // проверка ячейки "финиш" Excel на тип данных date
      // 86400000 мс в 24 часах
      if (data[el].t === "d") {
        const dateInMillisecons = moment.utc(data[el].w, "MM/DD/YYYY").format("x");
        setCorrectAttr(currentKey, +dateInMillisecons + (86400000 - 1));
      } else {
        cellError(columns.colIsError, 0, 0);
      }
      break;
    case columns.colJobName:
      setCorrectAttr(currentKey);
      break;
    case columns.colPredecessor:
      setCorrectAttr(currentKey);
      break;
    case columns.colIsError:
      cellError(columns.colIsError);
      break;
    case columns.colNameRus:
      setCorrectAttr(currentKey);
      break;
    case columns.colNameEng:
      setCorrectAttr(currentKey);
      break;
    case columns.colSPO:
      setCorrectAttr(currentKey);
      break;
    case columns.colPercentComplete:
      setCorrectAttr(currentKey);
      break;
    default:
      break;
  }
};
