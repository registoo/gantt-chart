import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

import "./styles.css";

const useStyles = makeStyles({
  topMenu__container: {
    "& *": {
      color: "#cccccc",
    },
    width: "100%",
    height: "30px",
    display: "grid",
    gridTemplateColumns: "min-content min-content",
    backgroundColor: "#3c3c3c",
    position: "relative",
  },
  topMenuButtons__container: {
    display: "grid",
    gridTemplateColumns: "repeat(3, min-content)",
    justifyItems: "center",
    alignItems: "center",
    userSelect: "none",
  },
  topMenu__button: {
    height: "100%",
    padding: "0px 6px",
    cursor: "context-menu",
    transition: "ease-out 0.03s",
    position: "relative",
    whiteSpace: "nowrap",
    borderRadius: "0px",
    textTransform: "initial",
    zIndex: "1488",
    "&:hover": {
      backgroundColor: "#505050",
      transition: "ease-in 0.05s",
    },
  },
});

const TopMenu = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <Box className="top-menu__container" boxShadow={1}>
    //   <img className="logo" src={logo} alt="" />
    //   <div className="top-menu-buttons__container">
    //     <div className="top-menu__button" tabIndex="0">
    //       Файл
    //       <Box className="top-menu-context__container" boxShadow={3}>
    //         <div className="top-menu-context">
    //           <span className="top-menu-context__name">Lorem</span>
    //           <span className="top-menu-context__shortcut">Alt+F4</span>
    //         </div>
    //         <div className="top-menu-context">
    //           <span className="top-menu-context__name">Ipsum</span>
    //           <span className="top-menu-context__shortcut">F4</span>
    //         </div>
    //         <hr />
    //         <div className="top-menu-context">
    //           <span className="top-menu-context__name">Отменить действие</span>
    //           <span className="top-menu-context__shortcut">Ctrl+Z</span>
    //         </div>
    //       </Box>
    //     </div>
    //     <div className="top-menu__button" tabIndex="2">
    //       Рабочая область
    //       <Box className="top-menu-context__container" boxShadow={3}>
    //         <Link to="/gantt">
    //           <div className="top-menu-context">
    //             <span className="top-menu-context__name">Гантт</span>
    //             <span className="top-menu-context__shortcut">Ctrl+Q</span>
    //           </div>
    //         </Link>
    //         <Link to="/consolidated">
    //           <div className="top-menu-context">
    //             <span className="top-menu-context__name">Сводные</span>
    //             <span className="top-menu-context__shortcut">Ctrl+W</span>
    //           </div>
    //         </Link>
    //         <hr />
    //         <div className="top-menu-context">
    //           <span className="top-menu-context__name">Отменить действие</span>
    //           <span className="top-menu-context__shortcut">Ctrl+Z</span>
    //         </div>
    //         <div className="top-menu-context">
    //           <span className="top-menu-context__name">Ipsum</span>
    //           <span className="top-menu-context__shortcut"></span>
    //         </div>
    //       </Box>
    //     </div>
    //   </div>
    // </Box>
    <Box className={classes.topMenu__container} boxShadow={1}>
      <img className="logo" src={logo} alt="" />
      <div className={classes.topMenuButtons__container}>
        <Button
          className={classes.topMenu__button}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Файл
        </Button>
        <Button
          className={classes.topMenu__button}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Рабочая область
        </Button>
      </div>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Link to="/gantt">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to="/consolidated">
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

const getState = (state) => {
  return {};
};

export default connect(getState)(TopMenu);
