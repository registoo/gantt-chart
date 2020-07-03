import filters from "./filters";

export default function ({ fullData, serializedFilters, filtersIds, state, defaultState }) {
  if (serializedFilters.length > 0) {
    const attr = serializedFilters[0].attr;
    const filterId = serializedFilters[0].filterType;
    return filters[filterId](state, attr);
  }
  return filters.filtersReset(state);
}
