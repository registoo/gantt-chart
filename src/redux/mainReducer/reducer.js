import fullData from "../../data";
import defaultState from "./defaultState.js";
import setFilters from "./dataFilters";
import * as d3 from "d3";
import getHerarchyDisplayedIds from "./auxDefaultState/getHerarchyIds";

export default function mainReducer(
  state = defaultState(d3.hierarchy({ name: "root", children: fullData })),
  action
) {
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

    case "ROLL_UP": {
      if (action.rolledUp) {
        action.d.data.data.rolledUp = action.rolledUp;
        result = { ...state.someData.previousState };
        return result;
      } else {
        const nodeDepth = action.d.depth;
        const hierarchySelectedData = [action.d];
        action.d.data.data.rolledUp = action.rolledUp;
        action.d.each((d) => {
          if (d.depth === nodeDepth + 1) {
            hierarchySelectedData.push(d);
          }
        });
        const hierarchySelectedIds = getHerarchyDisplayedIds(hierarchySelectedData);
        const hierarchyDisplayedData = hierarchySelectedData.slice(
          0,
          state.dataSpec.maxElementsOnPage
        );
        const hierarchyDisplayedIds = getHerarchyDisplayedIds(hierarchyDisplayedData);
        const elemnsOnPage =
          hierarchyDisplayedIds.length >= state.dataSpec.maxElementsOnPage
            ? state.dataSpec.maxElementsOnPage
            : hierarchyDisplayedIds.length;
        const heightSVG = elemnsOnPage * (state.sizes.sizesSVG.stringHeight * 1.25);
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
            hierarchyFullData: state.hierarchyFullData,
            hierarchyDisplayedData,
          }),
        };
        result = {
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
            accordionExpanded: !action.rolledUp,
            wheeled,
          },
          ids: { ...state.ids, hierarchyDisplayedIds },
          someData: { ...state.someData, previousState: state },
        };
        // console.log("ROLL_UP", result);
        return result;
      }
    }

    case "WHEEL_DATA": {
      const newScales = {
        ...state.scales.changeScales.changeScaleY({
          hierarchyDisplayedIds: action.displayedIds,
          sizesSVG: state.sizes.sizesSVG,
        }),
      };
      result = {
        ...state,
        scales: { ...state.scales, ...newScales },
        slicedData: {
          ...state.slicedData,
          hierarchyDisplayedData: action.displayedData,
        },
        ids: { ...state.ids, hierarchyDisplayedIds: action.displayedIds },
        dataSpec: {
          ...state.dataSpec,
          dataRange: action.dataRange,
        },
      };
      // console.log("WHEEL_DATA", result);
      return result;
    }

    case "LVL_4_BRUSH_SELECTED": {
      const hierarchyFullData = d3.hierarchy({ name: "root", children: fullData });
      const newFulldata = hierarchyFullData;
      hierarchyFullData.find((el, i) =>
        el.data.id === action.element.id ? (newFulldata[i] = action.element) : null
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
      // console.log("state", state);
      return state;
  }
}
