import React from "react";
import D3svg from "./components/d3svg";
import Input from "./components/input.js";
import WorksList from "./components/worksList";
import Resize from "react-resize-panel";
import "./resize.css";

function App(props) {
  return (
    <div className={"container"}>
      <div className={"body"}>
        <Resize direction="e" style={{ flexGrow: "1" }}>
          <WorksList />
        </Resize>
        <div className={"panel"}>
          <D3svg></D3svg>
        </div>

        {/* <Input></Input> */}
      </div>
    </div>
  );
}

export default App;
