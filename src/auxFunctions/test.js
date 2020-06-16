import { motion } from "framer-motion";
import React from "react";

const MyComponent = ({ x, width = 100 }) => (
  <motion.div
    animate={{
      x: 100,
      width,
    }}
    style={{ border: "1px solid black", height: 177 }}
  >
    <svg style={{ backgroundColor: "red", width: "100%", height: "100%" }}></svg>
  </motion.div>
);
export default MyComponent;
