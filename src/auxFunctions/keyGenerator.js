import sha1 from "js-sha1";

export default (d) => {
  return sha1(d).slice(-8);
};
