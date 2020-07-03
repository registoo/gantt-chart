import fullData from "../../data";
import defaultState from "./defaultState.js";
import { handJob } from "../../auxFunctions/resizedTypes";
import { rowHasError } from "../../auxFunctions";
import setFilters from "./dataFilters";

export default function testReducer(state = defaultState(fullData), action) {
  let result;
  switch (action.type) {
    case "SET_SVG_WIDTH": {
      const setXScaleWidth = state.scales.aux.setWidthOfHorizontalScale({
        widthSVG: action.svgWidth,
        marginSVG: state.sizesSVG.margin,
        displayedStartMS: state.scales.displayedStartMS,
        displayedFinishMS: state.scales.displayedFinishMS,
        xScaleMinCoordinate: state.scales.xScaleMinCoordinate,
      });
      result = {
        ...state,
        sizesSVG: {
          ...state.sizesSVG,
          width: action.svgWidth,
          resizedType: action.resizedType,
        },
        scales: { ...state.scales, ...setXScaleWidth },
      };
      console.log(result);
      return result;
    }
    case "SET_RESIZER_TYPE": {
      return {
        ...state,
        sizesSVG: { ...state.sizesSVG, resizedType: action.position },
      };
    }
    case "CHANGE_SVG_RANGE": {
      const setXScaleRange = state.scales.aux.setXRange(action.start, action.finish, state);
      result = {
        ...state,
        scales: { ...state.scales, ...setXScaleRange },
      };
      console.log(result);
      return result;
    }

    case "WHEEL_DATA": {
      const newScales = {
        ...state.scales.changeScales.changeScaleY({
          displayedIds: action.displayedIds,
          sizesSVG: state.sizesSVG,
        }),
      };
      result = {
        ...state,
        scales: { ...state.scales, ...newScales },
        slicedData: {
          ...state.slicedData,
          displayedData: action.displayedData,
        },
        ids: { ...state.ids, displayedIds: action.displayedIds },
        dataSpec: {
          ...state.dataSpec,
          dataRange: action.dataRange,
        },
      };
      console.log(result);
      return result;
    }

    case "FILTER_DATA_BY_DATE": {
      if (!action.filteredByDate) {
        return state.previousState ? state.previousState : state;
      }
      const maxElementsOnPage = state.dataSpec.maxElementsOnPage;
      const data0 =
        state.ids.selectedIds.length > 0 ? state.slicedData.selectedData : state.fullData;

      const selectedData = data0.filter((el) => {
        if (rowHasError(el.data)) return false;
        return (
          el.data.start.dateInMillisecons >= action.start &&
          el.data.start.dateInMillisecons <= action.finish
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
      const displayedData = selectedData.slice(0, currentElementsOnPage);
      const wheeled = selectedIds.length > maxElementsOnPage;
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
      result = {
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
          filteredByDate: action.filteredByDate,
        },
        previousState: state.previousState ? state.previousState : state,
      };
      console.log(result);
      return result;
    }

    case "SERIALIZE_FILTERS": {
      // serializedFilters массив фильтров, с добавлением фильтров по порядку
      let serializedFilters = state.dataSpec.filters.serializedFilters;
      // filtersIds - объект айдишников для более удобной сверки на true/false для отрисовки компонентов
      let filtersIds = state.dataSpec.filters.filtersIds;
      // сбрасывается ли фильтр
      filtersIds[action.filterType] = action.attr.selectedIds.length > 0 ? true : false;
      // если фильтр не удаляется
      if (filtersIds[action.filterType]) {
        // добавление первого фильтра
        if (serializedFilters.length === 0) {
          serializedFilters.push({ filterType: action.filterType, attr: action.attr });
        } else {
          let index;
          // поиск порядкового номера фильтра в массиве фильтров
          serializedFilters.find((e, i) => {
            index = e.filterType === action.filterType ? i : null;
          });
          // замена/добавление фильтра при его нахождении/не нахождении в массиве фильтров (-1 не найдено)
          index >= 0
            ? (serializedFilters[index] = { filterType: action.filterType, attr: action.attr })
            : serializedFilters.push({ filterType: action.filterType, attr: action.attr });
        }
      }
      // если фильтр удаляется
      else {
        let index;
        serializedFilters.find((e, i) => {
          index = e.filterType === action.filterType ? i : null;
        });
        serializedFilters.splice(index, 1);
      }

      result = setFilters({
        fullData: state.fullData,
        serializedFilters,
        filtersIds,
        state,
        defaultState,
      });
      console.log("result", result);
      return result;
    }

    default:
      return state;
  }
}
