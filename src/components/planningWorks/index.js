import React from "react";
import { connect } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { lvl4Editing } from "../../redux/mainReducer/action";

const F = (props) => {
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
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={props.lvl4scheduleEdit}
                onChange={(e) => props.lvl4Editing(e.target.checked)}
                name="checkedEdit"
              />
            }
            label="Редактирование Г4У"
          />
        </FormGroup>
      </div>
    </div>
  );
};

const getState = (state) => {
  return {
    width: state.mainReducer.sizes.sizesLeftMenu.width,
    margin: state.mainReducer.sizes.sizesLeftMenu.margin,
    lvl4scheduleEdit: state.mainReducer.dataSpec.lvl4scheduleEdit,
  };
};

export default connect(getState, { lvl4Editing })(F);
