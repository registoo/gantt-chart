export default (parent) => {
  const selectedElement = [parent];
  const nodeDepth = parent.depth;
  parent.each((d) => {
    if (d.depth === nodeDepth + 1) {
      selectedElement.push(d);
    }
  });
  return selectedElement;
};
