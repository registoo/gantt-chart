import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AdjustIcon from "@material-ui/icons/Adjust";
import AssessmentIcon from "@material-ui/icons/Assessment";
import "./styles.css";
import { connect } from "react-redux";
import { setWidth } from "../../redux/mainReducer/action";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
    backgroundColor: "#333333db",
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
      color: "#ffffff",
    },
  },
  indicator: {
    left: "0px",
    display: "inline-block",
  },
}));

function DashboardsPanel(props) {
  if (useLocation().pathname.match("/consolidated")) {
    console.log(true);
  }
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
          icon={<AdjustIcon />}
          title="Солнечная диаграмма (Ctrl+1)"
          {...a11yProps(0)}
          className={classes.tab}
          component={Link}
          to={"/consolidated/sun-chart"}
        />
        <Tab
          icon={<AssessmentIcon />}
          title="Столбчатая диаграмма (Ctrl+2)"
          {...a11yProps(1)}
          className={classes.tab}
          component={Link}
          to={"/consolidated/bar-chart"}
        />
      </Tabs>
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

export default connect(getState, { setWidth })(DashboardsPanel);
