import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import SearchIcon from "@material-ui/icons/Search";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LeftMenu from "../leftMenu";
import GanttHelper from "../ganttHelper";
import DashboardsPanel from "../WorkingPlace";
import "./styles.css";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";
import PlanningWorks from "../planningWorks";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import { useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, toggle, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && toggle && (
        <Box p={3} style={{ padding: 0 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    width: "fit-content",
  },
  tabs: {
    backgroundColor: "#333333",
  },
  tab: {
    "& svg ": {
      color: "#858585",
      transition: "ease-out 0.05s",
    },
    "&:hover svg": {
      color: "#ffffff",
      transition: "ease-in 0.05s",
    },
    "&.Mui-selected svg": {
      color: (isOpen) => (isOpen ? "#ffffff" : "#858585"),
    },
  },
  indicator: {
    left: "0px",
    display: (isOpen) => (isOpen ? "inline-block" : "none"),
  },
}));

function NavigationBar(props) {
  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles(isOpen);

  const handleChange = (event, newValue) => {
    const currentValue = value === newValue ? !isOpen : true;
    setIsOpen(currentValue);
    setValue(newValue);
    const leftMenuWidth = props.sizesLeftMenuWidth + props.sizesLeftMenuMarginRight * 2;
    props.setWidth({
      svgWidth: props.sizesSVGWidth,
      parentWidth: currentValue
        ? newValue !== value
          ? props.mainResizerWidth
          : props.mainResizerWidth - leftMenuWidth
        : props.mainResizerWidth + leftMenuWidth,
    });
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        indicator={isOpen.toString()}
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab
          icon={<FilterNoneIcon />}
          title="Навигатор по ганту (Ctrl+Shift+W)"
          {...a11yProps(0)}
          className={classes.tab}
        />
        <Tab
          icon={<SearchIcon />}
          title="Фильтры (Ctrl+Shift+F)"
          {...a11yProps(1)}
          className={classes.tab}
        />
        <Tab
          icon={<AirlineSeatReclineNormalIcon />}
          title="Фильтры (Ctrl+Shift+F)"
          {...a11yProps(2)}
          className={classes.tab}
        />
        {useLocation().pathname.match("/consolidated") && (
          <Tab
            icon={<DashboardIcon />}
            title="Дашборды (Ctrl+Shift+F)"
            {...a11yProps(3)}
            className={classes.tab}
          />
        )}
      </Tabs>
      <TabPanel className="TabPanel" value={value} index={0} toggle={isOpen}>
        <GanttHelper />
      </TabPanel>
      <TabPanel className="TabPanel" value={value} index={1} toggle={isOpen}>
        <LeftMenu />
      </TabPanel>
      <TabPanel className="TabPanel" value={value} index={2} toggle={isOpen}>
        <PlanningWorks />
      </TabPanel>
      {useLocation().pathname.match("/consolidated") && (
        <TabPanel
          className="TabPanel"
          style={{ backgroundColor: "#333333db" }}
          value={value}
          index={3}
          toggle={isOpen}
        >
          <DashboardsPanel />
        </TabPanel>
      )}
    </div>
  );
}

const getState = (state) => {
  return {
    sizesSVGWidth: state.mainReducer.sizes.sizesSVG.width,
    sizesLeftMenuMarginRight: state.mainReducer.sizes.sizesLeftMenu.margin.right,
    sizesLeftMenuWidth: state.mainReducer.sizes.sizesLeftMenu.width,
    mainResizerWidth: state.mainReducer.sizes.mainResizer.width,
  };
};

export default connect(getState, { setWidth })(NavigationBar);
