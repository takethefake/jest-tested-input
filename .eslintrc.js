module.exports = {
  plugins: ["react", "flowtype"],
  env: {
    browser: true,
    jest: true
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:flowtype/recommended",
    "eslint-config-prettier"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module",
    ecmaVersion: 2018
  },
  rules: {
    "no-console": "off"
  }
};
