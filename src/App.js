import React from "react";
import D3svg from "./components/d3svg";
import WorksList from "./components/worksList";
import Search from "./components/finders/findWork.js";
import { Container } from "@material-ui/core";
import ResizeDetector from "./auxFunctions/resizer/index.js";

function App(props) {
  return (
    <Container maxWidth="xl">
      <Search />
      <ResizeDetector>
        <WorksList />
        <D3svg resize="true" />
      </ResizeDetector>
    </Container>
  );
}

export default App;
