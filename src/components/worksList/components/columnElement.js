/* eslint no-eval: 0 */
import { Typography, Grid } from "@material-ui/core/";
import { rowHasError } from "../../../auxFunctions";
import React from "react";

export const ColTypography = (props) => {
  const d = props.data;
  const element = props.element === "id" ? "d.id" : `d.data.${props.element}.formattedText`;

  // делаем корректные пропы для Typography и Grid
  const typographyProps = ((props) => {
    const wrap = props.wrap ? props.wrap : null;
    delete props.wrap;
    return wrap ? { ...props, wrap } : { ...props };
  })(props.typography);

  const gridProps = ((props) => {
    const result = { ...props };
    // при наличии ошибки чтоб указывался только id в строке работы
    if (d.data.isError && element === "d.id") result.xs = 12;
    return result;
  })(props.grid);

  if (rowHasError(d.data)) {
    if (d.data.isError.formattedText && element === "d.id") {
      return (
        <Grid item {...gridProps}>
          <Typography {...typographyProps}>{d.data.isError.formattedText}</Typography>
        </Grid>
      );
    } else {
      return null;
    }
  }

  return (
    <Grid item {...gridProps}>
      <Typography {...typographyProps}>{eval(element)}</Typography>
    </Grid>
  );
};
