module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-bitwise": "off",
    "no-mixed-operators": 0,
    "linebreak-style": ["error", "windows"]
  }
};
