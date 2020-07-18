import React from "react";
import D3svg from "./components/d3svg";
import WorksList from "./components/worksList";
import { Container } from "@material-ui/core";
import ResizeDetector from "./auxFunctions/resizer/index.js";
import Polzynok from "./components/polzynok";
import LeftMenu from "././components/leftMenu";
import Slider from "./components/d3svg/slider";
import Tree from "./components/tree.js";
import Accordion from "./components/accordion.js";

function App(props) {
  return (
    <Container maxWidth="xl">
      <ResizeDetector>
        <LeftMenu />
        <Polzynok />
        <Accordion />
        <D3svg resize="true" />
      </ResizeDetector>
    </Container>
  );
}

export default App;
