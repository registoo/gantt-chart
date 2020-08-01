// считаем сдвиг надписи тика
export default (period, pixelsInOneDay, count) => {
  switch (period) {
    case "month":
    case "week":
      return (pixelsInOneDay * count) / 2;
    case "day":
      return pixelsInOneDay / 2;
    default:
      break;
  }
};
