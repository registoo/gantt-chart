import React from "react";
import D3svg from "./components/d3svg";
import WorksList from "./components/worksList";
import { Container } from "@material-ui/core";
import MainResizer from "./components/mainResizer/index.js";
import Polzynok from "./components/polzynok";
import LeftMenu from "././components/leftMenu";
import Slider from "./components/d3svg/slider";
import Accordion from "./components/accordion.js";

function App(props) {
  return (
    <Container maxWidth="xl">
      <LeftMenu />
      <Polzynok />
      <Slider />
      <MainResizer>
        <Accordion />
        <D3svg />
      </MainResizer>
    </Container>
  );
}

export default App;
