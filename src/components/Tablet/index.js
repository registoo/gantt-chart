import BaseTable, { Column } from "react-base-table";
import React from "react";

const data = [
  { id: 1, data: 1 },
  { id: 2, data: 1 },
];

const f = () => (
  <BaseTable data={data} width={600} height={400}>
    <Column key="col0" dataKey="col0" width={100} title="pervoy" />
    <Column key="col1" dataKey="col1" width={100} title="vtoroy" />
  </BaseTable>
);

export default f;
