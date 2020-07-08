import fullData from "../../data";
import defaultState from "./defaultState.js";
import setFilters from "./dataFilters";
import filtersTypes from "./dataFilters/typesOfFilters.js";

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

    case "SERIALIZE_FILTERS": {
      // serializedFilters массив фильтров, с добавлением фильтров по порядку
      let serializedFilters = state.dataSpec.filters.serializedFilters;
      // filtersIds - объект фильтров со значениями true/false для поиска активных фильтров
      let filtersIds = state.dataSpec.filters.filtersIds;
      // сбрасывается ли фильтр
      switch (action.filterType) {
        case filtersTypes.filterByWorks:
          filtersIds[action.filterType] = action.attr.reset ? false : true;
          break;
        case filtersTypes.filterByStartDate:
          filtersIds[action.filterType] =
            (action.attr.earlyStart || action.attr.lateStart) === 0 ? false : true;
          break;
        case filtersTypes.filterByFinishDate:
          filtersIds[action.filterType] =
            (action.attr.earlyFinish || action.attr.lateFinish) === 0 ? false : true;
          break;
        case filtersTypes.filterByPerformedDate:
          filtersIds[action.filterType] = (action.attr.from || action.attr.to) === 0 ? false : true;
          break;
        case filtersTypes.filterBySPO:
          filtersIds[action.filterType] = action.attr.reset ? false : true;
          break;
        default:
          break;
      }

      // если фильтр не снимается
      if (filtersIds[action.filterType]) {
        // добавление первого фильтра
        if (serializedFilters.length === 0) {
          serializedFilters.push({ filterType: action.filterType, attr: action.attr });
        } else {
          let index = -1;
          // поиск порядкового номера фильтра в массиве фильтров
          serializedFilters.find((e, i) => {
            if (index >= 0) return false;
            index = e.filterType === action.filterType ? i : -1;
            return false;
          });
          // замена/добавление фильтра при его нахождении/не нахождении в массиве фильтров (-1 не найдено)
          index >= 0
            ? (serializedFilters[index] = { filterType: action.filterType, attr: action.attr })
            : serializedFilters.push({ filterType: action.filterType, attr: action.attr });
        }
      }
      // если фильтр снимается
      else {
        let index = -1;
        serializedFilters.find((e, i) => {
          if (index >= 0) return false;
          index = e.filterType === action.filterType ? i : -1;
          return false;
        });
        if (index >= 0) serializedFilters.splice(index, 1);
      }
      result = setFilters({
        serializedFilters,
        state,
      });
      console.log(result);
      return result;
    }

    default:
      return state;
  }
}
