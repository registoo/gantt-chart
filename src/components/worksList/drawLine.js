import React, { Fragment } from "react";
import keyGenerator from "../../auxFunctions/keyGenerator";
import rowHasError from "../../auxFunctions/rowHasError";

export default (d, ind, yScale) => {
  const data = d.data.data;
  const jobName = rowHasError(data) ? data.isError.formattedText : data.jobName.formattedText;
  const start = rowHasError(data) ? null : data.start.formattedText;
  const finish = rowHasError(data) ? null : data.finish.formattedText;
  const percentComplete = rowHasError(data) ? null : data.percentComplete.formattedText;
  const SPO = rowHasError(data) ? null : data.SPO.formattedText;
  const nameRus = rowHasError(data) ? null : data.nameRus.formattedText;
  const nameEng = rowHasError(data) ? null : data.nameEng.formattedText;

  const resultDataKeys = [jobName, start, finish, percentComplete, SPO, nameRus, nameEng];

  const rowCol = resultDataKeys.map((col, i) => {
    return (
      <Fragment key={keyGenerator()}>
        <rect
          key={keyGenerator()}
          x={i * 125}
          y={yScale.paddingOuter() * yScale.step() + yScale.step() * ind}
          height={yScale.bandwidth()}
          width={100}
          stroke={"red"}
          fillOpacity={"0"}
        ></rect>
        <foreignObject
          x={i * 125}
          y={yScale.paddingOuter() * yScale.step() + yScale.step() * ind}
          height={yScale.bandwidth()}
          width={100}
          stroke={"red"}
          fillOpacity={"0"}
        >
          <div>{col}</div>
        </foreignObject>
      </Fragment>
    );
  });

  return <g key={keyGenerator()}>{rowCol}</g>;
};
