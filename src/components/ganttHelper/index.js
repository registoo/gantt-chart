import React from "react";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { selectColumns } from "../../redux/mainReducer/action";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function F(props) {
  const onChangeFunction = (event, arr) => {
    if (arr.length === 0) return props.selectColumns(props.namesOfColumns);
    props.selectColumns(
      arr.map((pickedEl) =>
        props.namesOfColumns.find((columnEl) => columnEl[Object.keys(columnEl)[0]] === pickedEl)
      )
    );
  };
  const optionsArr = props.namesOfColumns.map((el) => el[Object.keys(el)[0]]);
  const filteredOptions0 = props.filteredColumns.map((el) => el[Object.keys(el)[0]]);
  const filteredOptions1 = optionsArr.length === filteredOptions0.length ? [] : filteredOptions0;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: props.width,
        width: props.width,
        minWidth: props.width,
        marginRight: props.margin.right,
        marginLeft: props.margin.right,
        marginTop: props.margin.top,
      }}
    >
      <Autocomplete
        onChange={onChangeFunction}
        multiple
        id={"chooseColumns"}
        disableListWrap
        disableCloseOnSelect
        options={optionsArr}
        clearOnEscape
        value={filteredOptions1}
        noOptionsText="ничего не найдено"
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Выберите столбцы данных" />
        )}
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
    </div>
  );
}

const getState = (state) => {
  return {
    width: state.mainReducer.sizes.sizesLeftMenu.width,
    margin: state.mainReducer.sizes.sizesLeftMenu.margin,
    namesOfColumns: state.mainReducer.someData.namesOfColumns,
    filteredColumns: state.mainReducer.filters.filteredColumns,
  };
};

export default connect(getState, { selectColumns })(F);
