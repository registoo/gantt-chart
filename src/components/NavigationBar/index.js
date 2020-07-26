import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import SearchIcon from "@material-ui/icons/Search";
import LeftMenu from "../leftMenu";
import "./styles.css";

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
        <Box p={3}>
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

export default function NavigationBar() {
  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(true);
  const classes = useStyles(isOpen);

  const handleChange = (event, newValue) => {
    setIsOpen(value === newValue ? !isOpen : true);
    setValue(newValue);
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
          title="Фильтры (Ctrl+Shift+W)"
          {...a11yProps(0)}
          className={classes.tab}
        />
        <Tab
          icon={<SearchIcon />}
          title="Фильтры (Ctrl+Shift+F)"
          {...a11yProps(1)}
          className={classes.tab}
        />
      </Tabs>
      <TabPanel className="TabPanel" value={value} index={0} toggle={isOpen}>
        Text
      </TabPanel>
      <TabPanel className="TabPanel" value={value} index={1} toggle={isOpen}>
        <LeftMenu />
      </TabPanel>
    </div>
  );
}
