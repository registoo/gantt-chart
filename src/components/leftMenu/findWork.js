import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { VariableSizeList } from "react-window";
import { connect } from "react-redux";
import { setFilter } from "../../redux/mainReducer/action";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import filtersTypes from "../../redux/mainReducer/dataFilters/typesOfFilters.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);

  const itemCount = itemData.length;
  const itemSize = 36;

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.reduce((a) => a + itemSize, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={() => itemSize}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

function Virtualize(props) {
  const classes = useStyles();

  function onChangeFunction(event, arr, d0, d) {
    if (arr.length) {
      const data = props.filteredIds.length > 0 ? props.filteredData : props.fullData;
      const selectedData = arr.map((el) =>
        data.find((e, i) => {
          if (e.data.isError && el === e.data.isError.formattedText) return true;
          if (el === e.id) return true;
          return false;
        })
      );
      props.setFilter({
        filterType: filtersTypes.filterByWorks,
        attr: { selectedData, selectedIds: arr },
      });
    } else {
      // посылает пустой массив для сброса фильтра
      props.setFilter({
        filterType: filtersTypes.filterByWorks,
        attr: { selectedIds: arr, selectedData: [] },
      });
    }
  }

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="virtualize-demo"
      disableListWrap
      disableCloseOnSelect
      classes={classes}
      ListboxComponent={ListboxComponent}
      options={props.filteredIds.length > 0 ? props.filteredIds : props.fullIds}
      clearOnEscape
      value={props.pickedWorksIds}
      noOptionsText="ничего не найдено"
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Works" placeholder="Чего ищем?" />
      )}
      onChange={onChangeFunction}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
    />
  );
}
const getState = (state) => {
  return {
    pickedWorksIds: state.mainReducer.dataSpec.filters.pickedWorksIds,
    fullIds: state.mainReducer.ids.fullIds,
    fullData: state.mainReducer.fullData,
    filteredData: state.mainReducer.dataSpec.filters.filteredData,
    filteredIds: state.mainReducer.dataSpec.filters.filteredIds,
  };
};
export default connect(getState, { setFilter })(Virtualize);
