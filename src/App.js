import React from "react";
import { Container } from "@material-ui/core";
import D3svg from "./components/d3svg";
import WorksList from "./components/worksList";
import MainResizer from "./components/mainResizer/index.js";
import Slider from "./components/d3svg/slider";
import Accordion from "./components/accordion.js";
import TopMenu from "./components/TopMenu";
import NavigationBar from "./components/NavigationBar";

function App(props) {
  return (
    <Container className="AppContainer" maxWidth="xl" style={{ padding: "0px" }}>
      <div className="AppTopMenu">
        <TopMenu />
      </div>
      <div className="AppNavigationBar">
        <NavigationBar />
      </div>
      <div className="AppResizeContainer">
        <Slider />
        <MainResizer>
          <Accordion />
          <D3svg />
        </MainResizer>
      </div>
    </Container>
  );
}

export default App;
