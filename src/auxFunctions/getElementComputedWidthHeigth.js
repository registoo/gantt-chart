export default (node) => {
  var computedStyle = window.getComputedStyle(node);

  let width = node.clientWidth; // width with padding
  let height = node.clientHeight; // height with padding

  height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
  width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
  console.log("width", width, "clientWidth", node.clientWidth);
  return { height, width };
};
