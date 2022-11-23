module.exports = {
  rules: {
    "header-match-team-pattern": (parsed) => {
      const { type, scope, subject } = parsed;
      if (type === null && scope === null && subject === null) {
        return [false, "header must be in format 'type[scope?]: subject'"];
      }
      return [true, ""];
    },
  },
};
