import { keyGenerator } from "../../auxFunctions";
import * as d3 from "d3";

export default (parent, addWorkLvl4, hierarchyFullData) => {
  const Node = d3.hierarchy.prototype.constructor;
  const data = {};
  data.jobName = { ...parent.data.data.jobName };
  data.jobName.formattedText = "";
  data.brushedData = [];
  data.lvl4Dates = [];
  const child = Object.assign(new Node({ data }), {
    parent,
    depth: parent.depth + 1,
  });
  const id = keyGenerator();
  child.id = id;
  child.data.id = id;
  if (parent.children) {
    parent.children.push(child);
    parent.data.children.push(child);
  } else {
    parent.children = [child];
    parent.data.children = [child];
  }
  addWorkLvl4(parent, hierarchyFullData);
};
