import getHerarchyDisplayedIds from "./getHierarchyIds";

const f = (state, action) => {
  let hierarchySelectedData;
  switch (action.type) {
    case "LVL_4_ADD_WORK":
      hierarchySelectedData = [state.slicedData.hierarchyDisplayedData[0]];
      const parent = state.slicedData.hierarchyDisplayedData[0];
      const nodeDepth = parent.depth;
      parent.each((d) => {
        if (d.depth === nodeDepth + 1) {
          hierarchySelectedData.push(d);
        }
      });
      console.log(parent, hierarchySelectedData);
      break;
    case "ROLL_UP":
      if (action.accordionExpanded.expanded) {
        hierarchySelectedData = state.slicedData.hierarchySelectedData;
      } else {
        hierarchySelectedData = [action.d];
        const nodeDepth = action.d.depth;
        action.d.each((d) => {
          if (d.depth === nodeDepth + 1) {
            hierarchySelectedData.push(d);
          }
        });
      }
      break;
    default:
      hierarchySelectedData = state.slicedData.hierarchySelectedData;
      break;
  }
  const hierarchyDisplayedData = hierarchySelectedData.slice(0, state.dataSpec.maxElementsOnPage);
  const hierarchyDisplayedIds = getHerarchyDisplayedIds(hierarchyDisplayedData);
  const elemnsOnPage =
    hierarchyDisplayedIds.length >= state.dataSpec.maxElementsOnPage
      ? state.dataSpec.maxElementsOnPage
      : hierarchyDisplayedIds.length;
  const heightSVG = elemnsOnPage * state.sizes.sizesSVG.stringHeight;
  const sizesSVG = { ...state.sizes.sizesSVG, height: heightSVG };
  const wheeled = elemnsOnPage <= state.dataSpec.maxElementsOnPage ? false : true;
  const newScales = {
    ...state.scales.changeScales.changeScaleY({
      hierarchyDisplayedIds,
      sizesSVG,
    }),
    ...state.scales.changeScales.changeScaleX({
      sizesSVG,
      hierarchySelectedData,
      hierarchyFullData: action.hierarchyFullData,
      hierarchyDisplayedData,
    }),
  };

  //   console.log(
  //     "elemnsOnPage",
  //     elemnsOnPage,
  //     "heightSVG",
  //     sizesSVG.height,
  //     "hierarchyDisplayedData",
  //     hierarchyDisplayedData,
  //     "maxElementsOnPage",
  //     state.dataSpec.maxElementsOnPage,
  //     "hierarchyDisplayedIds",
  //     hierarchyDisplayedIds,
  //     "Y",
  //     newScales.yScale.domain()
  //   );
  return {
    ...state,
    scales: { ...state.scales, ...newScales },
    sizes: { ...state.sizes, sizesSVG },
    slicedData: {
      ...state.slicedData,
      hierarchyDisplayedData,
    },
    dataSpec: {
      ...state.dataSpec,
      dataRange: { start: state.dataSpec.startDataForDataRange, finish: elemnsOnPage },
      wheeled,
    },
    ids: { ...state.ids, hierarchyDisplayedIds },
  };
};

export default f;
