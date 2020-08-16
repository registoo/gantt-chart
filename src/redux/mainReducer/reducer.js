import fullData from "../../data";
import defaultState from "./defaultState.js";
import setFilters from "./dataFilters";
import * as d3 from "d3";
import getHerarchyDisplayedIds from "./auxDefaultState/getHierarchyIds";

export default function mainReducer(state = defaultState(), action) {
  let result;
  switch (action.type) {
    case "INITIALIZE_STATE": {
      result = defaultState(action.hierarchyFullData, action.hierarchyFullIds);
      console.log("INITIALIZE_STATE", result);
      return result;
    }
    case "SET_SVG_WIDTH": {
      const newState = { ...state };
      const setXScaleWidth = newState.scales.aux.setWidthOfHorizontalScale({
        widthSVG: action.svgWidth,
        marginSVG: newState.sizes.sizesSVG.margin,
        displayedStartMS: newState.scales.displayedStartMS,
        displayedFinishMS: newState.scales.displayedFinishMS,
        xScaleMinCoordinate: newState.scales.xScaleMinCoordinate,
      });
      newState.sizes.mainResizer.width = action.parentWidth;
      newState.sizes.sizesSVG.width = action.svgWidth;
      newState.scales = { ...state.scales, ...setXScaleWidth };

      console.log("SET_SVG_WIDTH", newState);
      return newState;
    }

    case "CHANGE_SVG_RANGE": {
      const setXScaleRange = state.scales.aux.setXRange(action.start, action.finish, state);
      result = {
        ...state,
        scales: { ...state.scales, ...setXScaleRange },
      };
      console.log("CHANGE_SVG_RANGE", result);
      return result;
    }

    case "ROLL_UP": {
      if (action.rolledUp) {
        action.d.data.data.rolledUp = action.rolledUp;
        result = { ...state.someData.previousState };
        result.dataSpec = { ...result.dataSpec, lvl4scheduleEdit: false };
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
        const hierarchyDisplayedData = hierarchySelectedData.slice(
          0,
          state.dataSpec.maxElementsOnPage
        );
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
        console.log("ROLL_UP", result);
        return result;
      }
    }

    case "WHEEL_DATA": {
      const newState = { ...state };
      const newScales = {
        ...newState.scales.changeScales.changeScaleY({
          hierarchyDisplayedIds: action.displayedIds,
          sizesSVG: newState.sizes.sizesSVG,
        }),
      };
      newState.slicedData.hierarchyDisplayedData = action.displayedData;
      newState.scales = { ...newState.scales, ...newScales };
      newState.ids.hierarchyDisplayedIds = action.displayedIds;
      newState.dataSpec.dataRange = action.dataRange;
      console.log("WHEEL_DATA", newState);
      return newState;
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
      console.log("LVL_4_BRUSH_SELECTED", action);
      return result;
    }

    case "LVL_4_EDITING": {
      result = {
        ...state,
        dataSpec: { ...state.dataSpec, lvl4scheduleEdit: action.checked },
      };
      console.log("LVL_4_EDITING", result);
      return result;
    }

    case "LVL_4_CONFIRM_ENTER": {
      result = {
        ...state,
        dataSpec: { ...state.dataSpec, lvl4ConfirmEnter: !state.dataSpec.lvl4ConfirmEnter },
      };
      console.log("LVL_4_CONFIRM_ENTER", result);
      return result;
    }

    case "SERIALIZE_FILTERS": {
      // serializedFilters массив фильтров, с добавлением фильтров по порядку
      let serializedFilters = state.filters.serializedFilters;
      // filtersIds - объект фильтров со значениями true/false для поиска активных фильтров
      let filtersIds = state.filters.filtersIds;
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
      result = setFilters(
        serializedFilters,
        state,
        action.hierarchyFullData,
        action.hierarchyFullIds
      );
      console.log("SERIALIZE_FILTERS", result);
      return result;
    }

    case "SELECT_COLUMNS": {
      result = {
        ...state,
        filters: { ...state.filters, filteredColumns: action.columns },
      };
      console.log("SELECT_COLUMNS", result);
      return result;
    }

    default:
      // console.log("state", state);
      return state;
  }
}
