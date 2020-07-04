import { rowHasError } from "../../../../auxFunctions";
import { handJob } from "../../../../auxFunctions/resizedTypes";

// if (!action.filteredByDate) {
//   return state.previousState ? state.previousState : state;
// }
export default (state, attr) => {
  const maxElementsOnPage = state.dataSpec.maxElementsOnPage;
  const data0 = state.ids.selectedIds.length > 0 ? state.slicedData.selectedData : state.fullData;
  const selectedData = data0.filter((el) => {
    if (rowHasError(el.data)) return false;
    return (
      el.data.start.dateInMillisecons >= attr.start &&
      el.data.start.dateInMillisecons <= attr.finish
    );
  });
  const selectedIds = selectedData.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );
  const currentElementsOnPage =
    selectedData.length >= maxElementsOnPage ? maxElementsOnPage : selectedData.length;
  const dataRange =
    currentElementsOnPage >= maxElementsOnPage
      ? { start: 0, finish: maxElementsOnPage }
      : { start: 0, finish: 0 };
  const displayedIds = selectedIds.slice(0, currentElementsOnPage);
  const wheeled = selectedIds.length > maxElementsOnPage;
  const displayedData = selectedData.slice(0, currentElementsOnPage);
  const heightSVG = currentElementsOnPage * (state.sizesSVG.stringHeight * 1.25);
  const sizesSVG = { ...state.sizesSVG, height: heightSVG, resizedType: handJob };
  const newScales = {
    ...state.scales.changeScales.changeScaleY({
      displayedIds,
      sizesSVG,
    }),
    ...state.scales.changeScales.changeScaleX({
      sizesSVG,
      selectedData,
      fullData: state.fullData,
      displayedData,
    }),
  };
  return {
    ...state,
    sizesSVG,
    slicedData: {
      ...state.slicedData,
      displayedData,
      selectedData,
    },
    ids: { ...state.ids, displayedIds, selectedIds },
    scales: { ...state.scales, ...newScales },
    dataSpec: {
      ...state.dataSpec,
      dataRange,
      currentElementsOnPage,
      wheeled,
    },
  };
};
