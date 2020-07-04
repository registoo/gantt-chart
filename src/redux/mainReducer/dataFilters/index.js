import filters from "./filters";

const func = (serializedFilters, state) => {
  const serializedFilters1 = [...serializedFilters];
  const firstElem = serializedFilters1.shift();
  const attr = firstElem.attr;
  const filterId = firstElem.filterType;
  const newState = filters[filterId](state, attr);
  if (serializedFilters1.length > 0) {
    return func(serializedFilters1, newState);
  }
  return newState;
};

export default function ({ serializedFilters, state }) {
  if (serializedFilters.length > 0) {
    return func(serializedFilters, state);
  }
  console.log("reset", state.ids);

  // сброс state при отсутствии фильтров
  return filters.filtersReset(state);
}
