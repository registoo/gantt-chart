export const setWidth = ({ svgWidth, parentWidth }) => {
  return {
    type: "SET_SVG_WIDTH",
    svgWidth: svgWidth,
    parentWidth,
  };
};
export const changeXRange = (selection) => {
  return {
    type: "CHANGE_SVG_RANGE",
    start: selection[0],
    finish: selection[1],
  };
};
export const setWheeledData = (start, finish) => {
  return {
    type: "WHEEL_DATA",
    start,
    finish,
  };
};
export const setFilter = (data) => {
  return {
    type: "SERIALIZE_FILTERS",
    attr: data.attr,
    filterType: data.filterType,
    hierarchyFullData: data.hierarchyFullData,
    hierarchyFullIds: data.hierarchyFullIds,
  };
};

export const setAccordionExpanded = (accordionExpanded, d, hierarchyFullData) => {
  return {
    type: "ROLL_UP",
    accordionExpanded: accordionExpanded,
    d,
    hierarchyFullData,
  };
};

export const lvl4BrushSelected = (data) => {
  return {
    type: "LVL_4_BRUSH_SELECTED",
    date: data.date,
    element: data.currentParentElement,
  };
};

export const lvl4Editing = (checked) => {
  return {
    type: "LVL_4_EDITING",
    checked: checked,
  };
};

export const lvl4ConfirmEnter = (parent) => {
  return {
    type: "LVL_4_CONFIRM_ENTER",
    parent,
  };
};

export const addWorkLvl4 = (parent, hierarchyFullData) => {
  return {
    type: "LVL_4_ADD_WORK",
    parent,
    hierarchyFullData,
  };
};

export const selectColumns = (data) => {
  return {
    type: "SELECT_COLUMNS",
    columns: data,
  };
};
export const initializeState = (hierarchyFullData, hierarchyFullIds) => {
  return {
    type: "INITIALIZE_STATE",
    hierarchyFullData,
    hierarchyFullIds,
  };
};
