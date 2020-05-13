export default (el) => {
  if (el.hasOwnProperty("isError")) {
    return true;
  } else {
    return false;
  }
};
