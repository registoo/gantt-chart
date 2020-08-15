import React from "react";
import { Container } from "@material-ui/core";
import D3svg from "./components/d3svg";
import MainResizer from "./components/mainResizer/index.js";
import Slider from "./components/d3svg/slider";
import TopMenu from "./components/TopMenu";
import NavigationBar from "./components/NavigationBar";
import Dashboards from "./components/WorkingPlace/Dashboards";
import { Switch, Route, withRouter } from "react-router-dom";
import WorkListSVG from "./components/worksList/workListSVG.js";

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
          <Route history={history} exact path="/">
            <h1>Доброго времени суток путник!</h1>
            <h3>Ты попал на главную страницу, потыкай в верхнем меню</h3>
          </Route>
          <Route history={history} path="/gantt">
            <Slider />
            <MainResizer>
              <WorkListSVG />
              <D3svg />
            </MainResizer>
          </Route>
          <Route history={history} path="/consolidated">
            <Dashboards />
          </Route>
        </Switch>
      </div>
    </Container>
  );
}

export default withRouter(App);
