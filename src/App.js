import React from "react";
import { Container } from "@material-ui/core";
import D3svg from "./components/d3svg";
import WorksList from "./components/worksList";
import MainResizer from "./components/mainResizer/index.js";
import LeftMenu from "././components/leftMenu";
import Slider from "./components/d3svg/slider";
import Accordion from "./components/accordion.js";
import TopMenu from "./components/TopMenu";

function App(props) {
  return (
    <Container maxWidth={false} style={{ padding: "0px" }}>
      <TopMenu />
      <LeftMenu />
      <Slider />
      <MainResizer>
        <Accordion />
        <D3svg />
      </MainResizer>
    </Container>
  );
}

export default App;
