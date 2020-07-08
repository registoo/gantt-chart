import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { VariableSizeList } from "react-window";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import filtersTypes from "../../../redux/mainReducer/dataFilters/typesOfFilters.js";
import { rowHasError } from "../../../auxFunctions/index.js";

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

export default function Virtualize(props) {
  const classes = useStyles();

  function onChangeFunction(event, arr, d0, d) {
    // если массив выборки не пустой, делаем фильтр
    if (arr.length) {
      const data =
        props.localFilteredIds.length > 0 ? props.localFilteredData : props.localFullData;

      // вызов экшена в зависимости от того, на каком фильтре смонтирован компонент
      switch (props.filterType) {
        case filtersTypes.filterByWorks: {
          const selectedData = arr.map((el) =>
            data.find((e) => {
              if (e.data.isError && el === e.data.isError.formattedText) return true;
              if (el === e.id) return true;
              return false;
            })
          );
          props.setFilter({
            filterType: props.filterType,
            attr: { selectedData, selectedIds: arr },
          });
          break;
        }
        case filtersTypes.filterBySPO: {
          const selectedData = data.filter((e) =>
            arr.lastIndexOf(e.data.SPO.formattedText) >= 0 ? true : false
          );
          const selectedIds = selectedData.map((d) =>
            rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
          );
          props.setFilter({
            filterType: props.filterType,
            attr: { selectedData, selectedIds, selectedSPO: arr },
          });
          break;
        }
        default:
          return;
      }
    } else {
      // посылает пустой массив для сброса фильтра
      props.setFilter({
        filterType: props.filterType,
        attr: { selectedIds: [] },
      });
    }
    return;
  }

  return (
    <Autocomplete
      multiple
      limitTags={props.limitTags}
      id={`virtualizeAutocomplete${props.selfId}`}
      disableListWrap
      disableCloseOnSelect
      classes={classes}
      ListboxComponent={ListboxComponent}
      options={props.localFullIds}
      clearOnEscape
      value={props.displayedInputData}
      noOptionsText="ничего не найдено"
      renderInput={(params) => <TextField {...params} variant="outlined" label={props.label} />}
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
