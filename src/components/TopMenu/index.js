import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import logo from "../../assets/images/logo.svg";
import "./styles.css";

const TopMenu = (props) => {
  return (
    <Box className="top-menu__container" boxShadow={1}>
      <img className="logo" src={logo} alt="" />
      <div className="top-menu-buttons__container">
        <div className="top-menu__button" tabIndex="0">
          Файл
          <Box className="top-menu-context__container" boxShadow={3}>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Lorem</span>
              <span className="top-menu-context__shortcut">Alt+F4</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Ipsum</span>
              <span className="top-menu-context__shortcut">F4</span>
            </div>
            <hr />
            <div className="top-menu-context">
              <span className="top-menu-context__name">Отменить действие</span>
              <span className="top-menu-context__shortcut">Ctrl+Z</span>
            </div>
          </Box>
        </div>
        <div className="top-menu__button" tabIndex="1">
          Редактировать
          <Box className="top-menu-context__container" boxShadow={3}>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Lorem</span>
              <span className="top-menu-context__shortcut">Alt+F4</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Ipsum</span>
              <span className="top-menu-context__shortcut">F4</span>
            </div>
            <hr />
            <div className="top-menu-context">
              <span className="top-menu-context__name">Отменить действие</span>
              <span className="top-menu-context__shortcut">Ctrl+Z</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Lorem Ipsum LoremIpsum Lorem</span>
              <span className="top-menu-context__shortcut">Alt+F4</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Ipsum</span>
              <span className="top-menu-context__shortcut">F4</span>
            </div>
            <hr />
            <div className="top-menu-context">
              <span className="top-menu-context__name">Отменить действие</span>
              <span className="top-menu-context__shortcut">Ctrl+Z</span>
            </div>
          </Box>
        </div>
        <div className="top-menu__button" tabIndex="2">
          Помощь
          <Box className="top-menu-context__container" boxShadow={3}>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Lorem</span>
              <span className="top-menu-context__shortcut">Alt+F4</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Ipsum</span>
              <span className="top-menu-context__shortcut">F4</span>
            </div>
            <hr />
            <div className="top-menu-context">
              <span className="top-menu-context__name">Отменить действие</span>
              <span className="top-menu-context__shortcut">Ctrl+Z</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Ipsum</span>
              <span className="top-menu-context__shortcut">F4</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Lorem</span>
              <span className="top-menu-context__shortcut">Alt+F4</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Ipsum</span>
              <span className="top-menu-context__shortcut">F4</span>
            </div>
            <hr />
            <div className="top-menu-context">
              <span className="top-menu-context__name">Отменить действие</span>
              <span className="top-menu-context__shortcut">Ctrl+Z</span>
            </div>
            <div className="top-menu-context">
              <span className="top-menu-context__name">Ipsum</span>
              <span className="top-menu-context__shortcut">F4</span>
            </div>
          </Box>
        </div>
      </div>
    </Box>
  );
};

const getState = (state) => {
  return {};
};

export default connect(getState)(TopMenu);
