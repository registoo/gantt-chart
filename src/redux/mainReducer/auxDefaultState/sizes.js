export default (heightSVG, stringHeight, initial, state) => {
  const mainResizer = initial ? { width: 0 } : state ? state.sizes.mainResizer : undefined;
  const sizesWL = initial
    ? { width: 0, height: heightSVG }
    : state
    ? state.sizes.sizesWL
    : undefined;
  const sizesSVG = {
    ganttTopScale: { height: 17 },
    separatorWidth: 6,
    minWidth: 100,
    width: 400,
    height: heightSVG,
    margin: {
      top: 0,
      right: 1,
      bottom: 1,
      left: 0,
    },
    stringHeight,
    slider: { height: 30 },
  };

  return {
    sizesWL,
    sizesSVG,
    mainResizer,
    polzynok: { width: 10, margin: { left: 5 } },
    sizesLeftMenu: { width: 400, margin: { right: 10, top: 10 } },
  };
};
