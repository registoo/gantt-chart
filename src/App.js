import React from "react";
import D3svg from "./components/d3svg";
import WorksList from "./components/worksList";
import { Container } from "@material-ui/core";
import ResizeDetector from "./auxFunctions/resizer/index.js";
import Polzynok from "./components/polzynok";
import LeftMenu from "././components/leftMenu";

function App(props) {
  return (
    <Container maxWidth="xl">
      <ResizeDetector>
        <LeftMenu />
        <Polzynok />
        <WorksList />
        <D3svg resize="true" />
      </ResizeDetector>
    </Container>
  );
}

export default App;
