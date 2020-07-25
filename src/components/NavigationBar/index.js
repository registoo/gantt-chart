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

let toggle = false;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#333333",
  },
}));

export default function NavigationBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    toggle = value === newValue ? false : true;

    console.log(toggle);
    console.log(value);
    console.log(newValue);
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
      >
        <Tab
          icon={<FilterNoneIcon style={{ color: "#858585" }} />}
          title="Фильтры (Ctrl+Shift+W)"
          {...a11yProps(0)}
        />
        <Tab
          icon={<SearchIcon style={{ color: "#858585" }} />}
          title="Фильтры (Ctrl+Shift+F)"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel className="TabPanel" value={value} index={0}>
        Text
      </TabPanel>
      <TabPanel className="TabPanel" value={value} index={1}>
        <LeftMenu />
      </TabPanel>
    </div>
  );
}
