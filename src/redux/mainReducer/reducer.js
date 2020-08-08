import fullData from "../../data";
import defaultState from "./defaultState.js";
import setFilters from "./dataFilters";

export default function testReducer(state = defaultState(fullData), action) {
  let result;
  switch (action.type) {
    case "SET_SVG_WIDTH": {
      const setXScaleWidth = state.scales.aux.setWidthOfHorizontalScale({
        widthSVG: action.svgWidth,
        marginSVG: state.sizes.sizesSVG.margin,
        displayedStartMS: state.scales.displayedStartMS,
        displayedFinishMS: state.scales.displayedFinishMS,
        xScaleMinCoordinate: state.scales.xScaleMinCoordinate,
      });
      result = {
        ...state,
        sizes: {
          ...state.sizes,
          mainResizer: { ...state.sizes.mainResizer, width: action.parentWidth },
          sizesSVG: {
            ...state.sizes.sizesSVG,
            width: action.svgWidth,
          },
        },
        scales: { ...state.scales, ...setXScaleWidth },
      };
      // console.log("SET_SVG_WIDTH", result);
      return result;
    }
    case "SET_RESIZER_TYPE": {
      result = {
        ...state,
        sizes: {
          ...state.sizes,
          sizesSVG: { ...state.sizes.sizesSVG },
        },
      };

      // console.log("SET_RESIZER_TYPE", result);
      return result;
    }
    case "CHANGE_SVG_RANGE": {
      const setXScaleRange = state.scales.aux.setXRange(action.start, action.finish, state);
      result = {
        ...state,
        scales: { ...state.scales, ...setXScaleRange },
      };
      // console.log("CHANGE_SVG_RANGE", result);
      return result;
    }

    case "ACCORDION_DATA": {
      const wheeled = !action.accordionExpanded;
      const heightSVG = action.displayedIds.length * (state.sizes.sizesSVG.stringHeight * 1.25);
      const sizesSVG = { ...state.sizes.sizesSVG, height: heightSVG };
      const newScales = {
        ...state.scales.changeScales.changeScaleY({
          displayedIds: action.displayedIds,
          sizesSVG,
        }),
        ...state.scales.changeScales.changeScaleX({
          sizesSVG,
          selectedData: state.slicedData.selectedData,
          fullData: state.fullData,
          displayedData: action.displayedData,
        }),
      };
      result = {
        ...state,
        scales: { ...state.scales, ...newScales },
        sizes: { ...state.sizes, sizesSVG },
        slicedData: {
          ...state.slicedData,
          displayedData: action.displayedData,
        },
        ids: { ...state.ids, displayedIds: action.displayedIds },
        dataSpec: {
          ...state.dataSpec,
          dataRange: action.dataRange,
          accordionExpanded: action.accordionExpanded,
          wheeled,
        },
      };
      // console.log("ACCORDION_DATA", result);
      return result;
    }

    case "WHEEL_DATA": {
      const newScales = {
        ...state.scales.changeScales.changeScaleY({
          displayedIds: action.displayedIds,
          sizesSVG: state.sizes.sizesSVG,
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
      // console.log("WHEEL_DATA", result);
      return result;
    }

    case "LVL_4_BRUSH_SELECTED": {
      const newFulldata = [...fullData];
      fullData.find((el, i) =>
        el.id === action.element.id ? (newFulldata[i] = action.element) : null
      );
      const newState = defaultState(newFulldata);
      result = {
        ...newState,
      };
      // console.log("LVL_4_BRUSH_SELECTED", action);
      return result;
    }

    case "SERIALIZE_FILTERS": {
      // serializedFilters массив фильтров, с добавлением фильтров по порядку
      let serializedFilters = state.dataSpec.filters.serializedFilters;
      // filtersIds - объект фильтров со значениями true/false для поиска активных фильтров
      let filtersIds = state.dataSpec.filters.filtersIds;
      // сбрасывается ли фильтр
      filtersIds[action.filterType] = action.attr.reset ? false : true;
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
      // console.log("SERIALIZE_FILTERS", result);
      return result;
    }

    case "SELECT_COLUMNS": {
      result = {
        ...state,
        dataSpec: {
          ...state.dataSpec,
          filters: { ...state.dataSpec.filters, filteredColumns: action.columns },
        },
      };
      // console.log("SELECT_COLUMNS", action);
      return result;
    }

    default:
      console.log(state);
      return state;
  }
}
