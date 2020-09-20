import fullData from "../../data";
import defaultState from "./defaultState.js";
import setFilters from "./dataFilters";
import * as d3 from "d3";
import getHerarchyDisplayedIds from "./auxDefaultState/getHierarchyIds";
import redrawSVGWithNewData from "./auxDefaultState/redrawSVGWithNewData";
import flatElement from "../../auxFunctions/hierarchy/flatElement";

const printLog = false;

export default function mainReducer(state = defaultState(), action) {
  let result;
  switch (action.type) {
    case "INITIALIZE_STATE": {
      result = defaultState(action.hierarchyFullData, action.hierarchyFullIds);
      printLog && console.log("INITIALIZE_STATE", result);
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

      printLog && console.log("SET_SVG_WIDTH", newState);
      return newState;
    }

    case "CHANGE_SVG_RANGE": {
      const setXScaleRange = state.scales.aux.setXRange(action.start, action.finish, state);
      result = {
        ...state,
        scales: { ...state.scales, ...setXScaleRange },
      };
      printLog && console.log("CHANGE_SVG_RANGE", result);
      return result;
    }

    case "ROLL_UP": {
      // если раскрыто, то принимаем родительский элемент как селектед для рисования шкал и пр. локального
      let selectedElement;
      if (action.accordionExpanded.expanded) {
        selectedElement = state.slicedData.hierarchySelectedData;
      } else {
        selectedElement = flatElement(action.d);
      }
      result = redrawSVGWithNewData(state, action);
      result.dataSpec.accordionExpanded = {
        expanded: !action.accordionExpanded.expanded,
        element: !action.accordionExpanded.expanded ? selectedElement : undefined,
      };
      printLog && console.log("ROLL_UP", result);
      return result;
    }

    case "LVL_4_ADD_WORK": {
      result = redrawSVGWithNewData(state, action);
      printLog && console.log("LVL_4_ADD_WORK", result);
      return result;
    }

    case "WHEEL_DATA": {
      let data;
      if (state.dataSpec.accordionExpanded.expanded) {
        data = state.dataSpec.accordionExpanded.element;
      } else {
        data = state.slicedData.hierarchySelectedData;
      }
      const hierarchyDisplayedData = data.slice(action.start, action.finish);
      const hierarchyDisplayedIds = getHerarchyDisplayedIds(hierarchyDisplayedData);
      const newScales = {
        ...state.scales.changeScales.changeScaleY({
          hierarchyDisplayedIds,
          sizesSVG: state.sizes.sizesSVG,
        }),
      };
      const newState = { ...state };
      newState.slicedData.hierarchyDisplayedData = hierarchyDisplayedData;
      newState.ids.hierarchyDisplayedIds = hierarchyDisplayedIds;
      newState.scales = { ...newState.scales, ...newScales };
      newState.dataSpec.dataRange = { start: action.start, finish: action.finish };
      printLog && console.log("WHEEL_DATA", newState);
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
      printLog && console.log("LVL_4_BRUSH_SELECTED", action);
      return result;
    }

    case "LVL_4_EDITING": {
      result = {
        ...state,
        dataSpec: { ...state.dataSpec, lvl4scheduleEdit: action.checked },
      };
      printLog && console.log("LVL_4_EDITING", result);
      return result;
    }

    case "LVL_4_CONFIRM_ENTER": {
      result = {
        ...state,
        slicedData: {
          ...state.slicedData,
          counter: state.slicedData.counter ? state.slicedData.counter + 1 : 1,
        },
      };
      printLog && console.log("LVL_4_CONFIRM_ENTER", result);
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
      printLog && console.log("SERIALIZE_FILTERS", result);
      return result;
    }

    case "SELECT_COLUMNS": {
      result = {
        ...state,
        filters: { ...state.filters, filteredColumns: action.columns },
      };
      printLog && console.log("SELECT_COLUMNS", result);
      return result;
    }

    default:
      printLog && console.log("state", state);
      return state;
  }
}
