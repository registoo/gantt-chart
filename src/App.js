import React from "react";
import D3svg from "./components/d3svg";
import WorksList from "./components/worksList";
import { Container } from "@material-ui/core";
import ResizeDetector from "./auxFunctions/resizer/index.js";

function App(props) {
  return (
    <Container maxWidth="xl">
      <ResizeDetector>
        <WorksList resize="true" />
        <D3svg />
      </ResizeDetector>
    </Container>
  );
}

export default App;
