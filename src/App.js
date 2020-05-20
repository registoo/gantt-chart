import React from "react";
import D3svg from "./components/d3svg";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Input from "./components/input.js";

function App(props) {
  return (
    <Container maxWidth="xl">
      <Grid container direction="row" justify="space-around" alignItems="center">
        <Grid item xl={6} xs={6}>
          <D3svg></D3svg>
        </Grid>
        <Grid item xl={6} xs={6}>
          {/* <D3svg></D3svg> */}
        </Grid>
      </Grid>
      <Input></Input>
    </Container>
  );
}

export default App;
