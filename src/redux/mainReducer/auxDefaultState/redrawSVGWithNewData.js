import getHerarchyDisplayedIds from "./getHierarchyIds";
import flatElement from "../../../auxFunctions/hierarchy/flatElement";

const f = (state, action) => {
  let flatData;
  const accordionExpanded = { ...state.dataSpec.accordionExpanded };
  switch (action.type) {
    case "LVL_4_ADD_WORK":
      flatData = flatElement(action.parent);
      accordionExpanded.element = flatData;
      break;
    case "ROLL_UP":
      if (action.accordionExpanded.expanded) {
        flatData = state.slicedData.hierarchySelectedData;
        accordionExpanded.expanded = action.accordionExpanded.expanded;
        accordionExpanded.element = undefined;
      } else {
        flatData = flatElement(action.d);
        accordionExpanded.expanded = action.accordionExpanded.expanded;
        accordionExpanded.element = flatData;
      }
      break;
    default:
      flatData = state.slicedData.hierarchySelectedData;
      break;
  }
  const hierarchyDisplayedData = flatData.slice(0, state.dataSpec.maxElementsOnPage);
  const hierarchyDisplayedIds = getHerarchyDisplayedIds(hierarchyDisplayedData);
  const elemnsOnPage =
    hierarchyDisplayedIds.length >= state.dataSpec.maxElementsOnPage
      ? state.dataSpec.maxElementsOnPage
      : hierarchyDisplayedIds.length;
  const heightSVG = elemnsOnPage * state.sizes.sizesSVG.stringHeight;
  const sizesSVG = { ...state.sizes.sizesSVG, height: heightSVG };
  const wheeled =
    getHerarchyDisplayedIds(flatData).length <= state.dataSpec.maxElementsOnPage ? false : true;

  const newScales = {
    ...state.scales.changeScales.changeScaleY({
      hierarchyDisplayedIds,
      sizesSVG,
    }),
    ...state.scales.changeScales.changeScaleX({
      sizesSVG,
      hierarchySelectedData: flatData,
      hierarchyFullData: action.hierarchyFullData,
      hierarchyDisplayedData,
    }),
  };

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
      accordionExpanded,
    },
    ids: { ...state.ids, hierarchyDisplayedIds },
  };
};

export default f;
