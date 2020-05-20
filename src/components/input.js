import { Input, Button } from "@material-ui/core";
import { connect } from "react-redux";
import React, { useState } from "react";
import { setWidth } from "../redux/mainReducer/action";

function I(props) {
  const f = () => {
    props.setWidth(+width);
  };
  const [width, setCount] = useState("");
  return (
    <div>
      <Input onChange={(e) => setCount(e.target.value)} value={width}></Input>
      <Button onClick={f}>Button</Button>
      <div>{width}</div>
    </div>
  );
}

const getState = (state) => {
  return state.mainReducer;
};

export default connect(getState, { setWidth })(I);
