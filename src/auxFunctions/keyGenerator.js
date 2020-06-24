import crypto from "crypto-random-string";

export default (d) => {
  return crypto({ length: 15, type: "url-safe" });
};
