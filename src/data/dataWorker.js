import moment from "moment";

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
    case "start":
      // проверка ячейки "старт" Excel на тип данных date
      if (data[el].t === "d") {
        const dateInMillisecons = moment.utc(data[el].w, "MM/DD/YYYY").format("x");
        setCorrectAttr(currentKey, +dateInMillisecons);
      } else {
        cellError("isError", 0, 0);
      }
      break;
    case "finish":
      // проверка ячейки "финиш" Excel на тип данных date
      // 86400000 мс в 24 часах
      if (data[el].t === "d") {
        const dateInMillisecons = moment.utc(data[el].w, "MM/DD/YYYY").format("x");
        setCorrectAttr(currentKey, +dateInMillisecons + (86400000 - 1));
      } else {
        cellError("isError", 0, 0);
      }
      break;
    case "jobName":
      setCorrectAttr(currentKey);
      break;
    case "predecessor":
      setCorrectAttr(currentKey);
      break;
    case "isError":
      cellError("isError");
      break;
    case "nameRus":
      setCorrectAttr(currentKey);
      break;
    case "nameEng":
      setCorrectAttr(currentKey);
      break;
    default:
      break;
  }
};
