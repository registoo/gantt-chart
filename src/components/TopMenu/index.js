import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import Fade from "@material-ui/core/Fade";
// import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

import "./styles.css";

const useStyles = makeStyles({
  topMenu__container: {
    width: "100%",
    height: "30px",
    display: "grid",
    gridTemplateColumns: "min-content min-content",
    backgroundColor: "#3c3c3c",
    position: "relative",
  },
  logo: {
    height: "24px",
    width: "24px",
    userSelect: "none",
    margin: "3px 6px",
  },
  topMenuButtons__container: {
    display: "grid",
    gridTemplateColumns: "repeat(3, min-content)",
    justifyItems: "center",
    alignItems: "center",
    userSelect: "none",
  },
  topMenu__button: {
    color: "#cccccc",
    height: "100%",
    padding: "0px 6px",
    cursor: "context-menu",
    transition: "ease-out 0.03s",
    position: "relative",
    whiteSpace: "nowrap",
    borderRadius: "0px",
    textTransform: "initial",
    "&:hover": {
      backgroundColor: "#505050",
      transition: "ease-in 0.05s",
    },
  },
  topMenuContext__container: {
    zIndex: "1488",

    "& .MuiPaper-root": {
      backgroundColor: "#252526",
      borderRadius: "0",
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
      transition: "ease-in 0s !important",
    },
    "& a": {
      textDecoration: "none",
    },
    "& li": {
      transition: "ease-out 0.05s",
      padding: "0px 20px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridColumnGap: "20px",
      whiteSpace: "nowrap",
      fontSize: "0.95rem",
      color: "#cccccc",
      cursor: "context-menu",

      "&:hover": {
        backgroundColor: "#094771",
        transition: "ease-in 0.05s",
      },
      "& span:nth-child(2)": {
        justifySelf: "end",
      },
    },
  },
});

const TopMenu = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const anchorRef = React.useRef(null);
  const anchorRef2 = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleToggle2 = () => {
    setOpen2((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClose2 = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }

    setOpen2(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleListKeyDown2(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen2(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const prevOpen2 = React.useRef(open2);
  React.useEffect(() => {
    if (prevOpen2.current === true && open2 === false) {
      anchorRef.current.focus();
    }

    prevOpen2.current = open2;
  }, [open2]);

  // const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

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

    // <Box className={classes.topMenu__container} boxShadow={1}>
    //   <img className={classes.logo} src={logo} alt="logotype" />
    //   <div className={classes.topMenuButtons__container}>
    //     <Button
    //       className={classes.topMenu__button}
    //       aria-controls="fade-menu"
    //       aria-haspopup="true"
    //       onClick={handleClick}
    //     >
    //       Файл
    //     </Button>
    //     <Button
    //       className={classes.topMenu__button}
    //       aria-controls="fade-menu"
    //       aria-haspopup="true"
    //       onClick={handleClick}
    //     >
    //       Рабочая область
    //     </Button>
    //   </div>

    //   <Menu
    //     className={classes.topMenuContext__container}
    //     id="fade-menu"
    //     anchorEl={anchorEl}
    //     keepMounted
    //     open={open}
    //     onClose={handleClose}
    //     TransitionComponent={Fade}
    // elevation={0}
    // getContentAnchorEl={null}
    // anchorOrigin={{
    //   vertical: "bottom",
    //   horizontal: "left",
    // }}
    //     transformOrigin={{
    //       vertical: "top",
    //       horizontal: "left",
    //     }}
    //   >
    //     <Link to="/gantt">
    //       <MenuItem onClick={handleClose}>
    //         <span>Гантт</span>
    //         <span>Ctrl+W</span>
    //       </MenuItem>
    //     </Link>
    //     <Link to="/consolidated">
    //       <MenuItem onClick={handleClose}>
    //         <span>Сводные</span>
    //         <span>Ctrl+E</span>
    //       </MenuItem>
    //     </Link>
    //   </Menu>
    // </Box>

    <Box className={classes.topMenu__container} boxShadow={1}>
      <img className={classes.logo} src={logo} alt="logotype" />
      <div className={classes.topMenuButtons__container}>
        <Button
          className={classes.topMenu__button}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Файл
        </Button>
        <Button
          className={classes.topMenu__button}
          ref={anchorRef2}
          aria-controls={open2 ? "menu-list-grow2" : undefined}
          aria-haspopup="true"
          onClick={handleToggle2}
        >
          Выборка
        </Button>
      </div>
      <Popper
        className={classes.topMenuContext__container}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id={`menu-list-grow`} onKeyDown={handleListKeyDown}>
              <Link to="/">
                <MenuItem onClick={handleClose}>
                  <span>Main</span>
                  <span>Ctrl+W</span>
                </MenuItem>
              </Link>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>

      <Popper
        className={classes.topMenuContext__container}
        open={open2}
        anchorEl={anchorRef2.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose2}>
            <MenuList autoFocusItem={open2} id={`menu-list-grow2`} onKeyDown={handleListKeyDown2}>
              <Link to="/gantt">
                <MenuItem onClick={handleClose2}>
                  <span>Гантт</span>
                  <span>Ctrl+W</span>
                </MenuItem>
              </Link>
              <Link to="/consolidated">
                <MenuItem onClick={handleClose2}>
                  <span>Сводные</span>
                  <span>Ctrl+E</span>
                </MenuItem>
              </Link>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Box>
  );
};

const getState = (state) => {
  return {};
};

export default connect(getState)(TopMenu);
