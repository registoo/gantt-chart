import crypto from "crypto-random-string";

export default () => {
  return crypto({ length: 15, type: "url-safe" });
};
