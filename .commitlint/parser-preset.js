module.exports = {
  parserOpts: {
    headerPattern: /^(\w*)(?:\[([\w$.\-*/ ]*)\])?: (.*)$/,
    headerCorrespondence: ["type", "scope", "subject"],
  },
};
