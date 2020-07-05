import fullData from "../../data";
import defaultState from "./defaultState.js";
import { handJob } from "../../auxFunctions/resizedTypes";
import { rowHasError } from "../../auxFunctions";
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
      // filtersIds - объект айдишников для более удобной сверки на true/false для отрисовки компонентов
      let filtersIds = state.dataSpec.filters.filtersIds;
      // сбрасывается ли фильтр
      switch (action.filterType) {
        case filtersTypes.filterByWorks:
          filtersIds[action.filterType] = action.attr.selectedIds.length > 0 ? true : false;
          if (!filtersIds[action.filterType]) {
            state.dataSpec.findWorkIds = [];
          } else {
            state.dataSpec.findWorkIds = action.attr.selectedIds;
          }
          break;
        case filtersTypes.filterByStartDate:
          filtersIds[action.filterType] =
            (action.attr.start || action.attr.finish) === 0 ? false : true;
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
            if (index >= 0) return;
            index = e.filterType === action.filterType ? i : -1;
          });
          // замена/добавление фильтра при его нахождении/не нахождении в массиве фильтров (-1 не найдено)
          index >= 0
            ? (serializedFilters[index] = { filterType: action.filterType, attr: action.attr })
            : serializedFilters.push({ filterType: action.filterType, attr: action.attr });
        }
      }
      // если фильтр снимается
      else {
        // начальное значения для того, чтоб дальнейший поиск не замещал найденное значение
        let index = -1;
        serializedFilters.find((e, i) => {
          if (index >= 0) return;
          index = e.filterType === action.filterType ? i : -1;
        });
        if (index >= 0) serializedFilters.splice(index, 1);
      }
      result = setFilters({
        serializedFilters,
        state,
      });
      console.log("result", result);
      return result;
    }

    default:
      return state;
  }
}
