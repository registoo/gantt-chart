import React from "react";
import { Container } from "@material-ui/core";
import D3svg from "./components/d3svg";
import WorksList from "./components/worksList";
import MainResizer from "./components/mainResizer/index.js";
import Slider from "./components/d3svg/slider";
import Accordion from "./components/accordion.js";
import TopMenu from "./components/TopMenu";
import NavigationBar from "./components/NavigationBar";
import { Switch, Route, withRouter } from "react-router-dom";

function App(props) {
  const { history } = props;

  return (
    <Container className="AppContainer" maxWidth="xl" style={{ padding: "0px" }}>
      <div className="AppTopMenu">
        <TopMenu />
      </div>
      <div className="AppNavigationBar">
        <NavigationBar />
      </div>
      <div className="AppResizeContainer">
        <Switch>
          <Route history={history} path="/gantt">
            <Slider />
            <MainResizer>
              <Accordion />
              <D3svg />
            </MainResizer>
          </Route>
          <Route history={history} path="/consolidated">
            <h2>Сводные таблички</h2>
          </Route>
        </Switch>
      </div>
    </Container>
  );
}

export default withRouter(App);
