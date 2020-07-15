module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2020: true,
  },
  extends: ["prettier", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 11,
  },
  ignorePatterns: ["./node_modules"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
