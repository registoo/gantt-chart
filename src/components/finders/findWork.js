import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { VariableSizeList } from "react-window";
import { connect } from "react-redux";
import { setDisplayedData } from "../../redux/mainReducer/action";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";

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
      const selectedData = arr.map((el) =>
        props.fullData.find((e, i) => {
          if (el === e.id) return true;
          return false;
        })
      );
      props.setDisplayedData({ selectedData, selectedIds: arr, filtered: true });
      return;
    }
    // посылает пустой массив для сброса фильтра
    props.setDisplayedData({ selectedIds: arr, filtered: false });
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
      options={props.totalIds}
      clearOnEscape
      value={props.filtered ? props.displayedIds : []}
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
    totalIds: state.mainReducer.ids.totalIds,
    fullData: state.mainReducer.fullData,
    displayedIds: state.mainReducer.ids.displayedIds,
    selectedIds: state.mainReducer.ids.selectedIds,
    filtered: state.mainReducer.dataSpec.filtered,
  };
};
export default connect(getState, { setDisplayedData })(Virtualize);
