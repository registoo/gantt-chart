import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import keyGenerator from "../auxFunctions/keyGenerator.js";
import { setAccordionData } from "../redux/mainReducer/action.js";
import rowHasError from "../auxFunctions/rowHasError.js";

function DetailedAccordion(props) {
  const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20,
    },
    details: {
      alignItems: "center",
    },
    column: {
      flexBasis: "33.33%",
    },
    row: {
      backgroundColor: "red",
      height: props.yScale.bandwidth(),
      border: "2px solid purple",
      marginTop: props.yScale.padding() * props.yScale.step(),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    header: {
      border: "1px solid red",
      padding: 0,
    },
  }));
  const summaryStyles = {
    root: {
      minHeight: props.yScale.bandwidth(),
      "&$expanded": {
        minHeight: props.yScale.bandwidth(),
      },
      marginTop: props.yScale.padding() * props.yScale.step(),
    },
    content: {
      margin: "4px 0",
      "&$expanded": {
        margin: "4px 0",
      },
    },
    expandIcon: {
      padding: 3,
    },
    expanded: { backgroundColor: "green" },
  };
  const classes = useStyles();
  const CompactExpansionPanelSummary = withStyles(summaryStyles)(AccordionSummary);
  CompactExpansionPanelSummary.muiName = "AccordionSummary";

  const [state, setState] = useState({});

  const elem = (el) => {
    const children = el.children.map((el) => {
      return (
        <AccordionDetails className={clsx(classes.details, classes.row)} key={keyGenerator()}>
          <div className={clsx(classes.column, classes.helper)}>{el.id}</div>
        </AccordionDetails>
      );
    });
    return (
      <Accordion
        square
        expanded={props.accordionExpanded}
        TransitionProps={{ unmountOnExit: true }}
        key={keyGenerator()}
        onChange={(e, boolExpanded) => {
          // при нажатии на строку с ошибкой ничего не происходит
          if (rowHasError(el.data)) return;
          // добавляем детей в одномерный массив
          const displayedData = [el];
          el.children.map((el) => displayedData.push(el));
          const displayedIds = displayedData.map((d) => {
            return rowHasError(d.data) ? d.data.isError.formattedText : d.id;
          });
          const dataRange = { start: 0, finish: 0 + el.children.length };
          // если раскрыто
          if (boolExpanded) {
            setState({
              bool: true,
              displayedData: props.displayedData,
              displayedIds: props.displayedIds,
              dataRange: props.dataRange,
            });
            props.setAccordionData({
              displayedData,
              displayedIds,
              dataRange,
              accordionExpanded: boolExpanded,
            });
          }
          // если не раскрыто
          else {
            // если есть активные фильтры, то при выходе из Г4У берём данные для отображения из них
            if (props.serializedFilters.length > 0) {
              const displayedData = props.selectedData.slice(
                props.startDataForDataRange,
                props.maxElementsOnPage
              );
              const displayedIds = displayedData.map((d) =>
                rowHasError(d.data) ? d.data.isError.formattedText : d.id
              );
              props.setAccordionData({
                displayedData,
                displayedIds,
                dataRange: props.dataRange,
                accordionExpanded: boolExpanded,
              });
            } else {
              props.setAccordionData({
                displayedData: state.displayedData,
                displayedIds: state.displayedIds,
                dataRange: state.dataRange,
                accordionExpanded: boolExpanded,
              });
            }
            setState({
              bool: false,
              displayedData: [],
              displayedIds: [],
              dataRange: [],
            });
          }
        }}
      >
        <CompactExpansionPanelSummary
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={classes.header}
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{el.id}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Select </Typography>
          </div>
        </CompactExpansionPanelSummary>
        {children}
      </Accordion>
    );
  };
  return (
    <div
      style={{
        marginTop: props.headerHeight,
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        overflowX: "scroll",
      }}
    >
      {props.accordionExpanded
        ? elem(props.displayedData[0])
        : props.displayedData.map((el, i) => elem(el, i))}
    </div>
  );
}

const getState = (state) => {
  return {
    yScale: state.mainReducer.scales.yScale,
    displayedData: state.mainReducer.slicedData.displayedData,
    displayedIds: state.mainReducer.ids.displayedIds,
    dataRange: state.mainReducer.dataSpec.dataRange,
    startDataForDataRange: state.mainReducer.dataSpec.startDataForDataRange,
    maxElementsOnPage: state.mainReducer.dataSpec.maxElementsOnPage,
    accordionExpanded: state.mainReducer.dataSpec.accordionExpanded,
    serializedFilters: state.mainReducer.dataSpec.filters.serializedFilters,
    sizesSVG: state.mainReducer.sizes.sizesSVG,
    headerHeight: state.mainReducer.sizes.sizesSVG.slider.height,
    selectedData: state.mainReducer.slicedData.selectedData,
  };
};

export default connect(getState, { setAccordionData })(DetailedAccordion);
