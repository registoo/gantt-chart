import { keyGenerator } from "../../auxFunctions";
import * as d3 from "d3";

export default (hierarchyDisplayedData, addWorkLvl4, hierarchyFullData) => {
  const Node = d3.hierarchy.prototype.constructor;
  const parent = hierarchyDisplayedData[0];
  const child = Object.assign(new Node(), { parent, depth: parent.depth + 1 });
  const id = keyGenerator();
  console.log("child", child, new Node());
  child.id = id;
  child.data.id = id;
  if (parent.children) {
    parent.children.push(child);
    parent.data.children.push(child);
  } else parent.children = [child];
  addWorkLvl4(hierarchyDisplayedData[0], hierarchyFullData);
};
