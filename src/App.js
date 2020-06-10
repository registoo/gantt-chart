import React from "react";
// import D3svg from "./components/d3svg";
import { Container, Box } from "@material-ui/core";
// import { Container, Grid, Box } from "@material-ui/core";
// import Input from "./components/input.js";
// import Works from "./components/worksList/index.js";
import Motion from "./components/div.js";
import { Resizable } from "re-resizable";

function App(props) {
  return (
    <Container maxWidth="xl">
      {/* <Grid container direction="row" justify="space-between" alignItems="flex-start"> */}
      {/* <Grid item xs={7}>
          <Works></Works>
        </Grid>
        <Grid item xs={5}>
          <D3svg></D3svg>
        </Grid>
        <Grid item xs={4}>
          <Input></Input>
        </Grid> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Resizable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
          }}
          defaultSize={{
            width: "50%",
            height: 200,
          }}
          maxWidth="100%"
          minWidth="1"
        >
          001
        </Resizable>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
            width: "100%",
            minWidth: "1px",
          }}
        >
          002
        </div>
      </div>
      {/* </Grid> */}
    </Container>
  );
}

export default App;
