// .eslintrc.js
module.exports = {
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      requireConfigFile: false,
      babelOptions: {
        presets: ["@babel/preset-react"],
      },
    },
    plugins: ["react"],
    extends: ["react-app", "react-app/jest"],
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "capitalized-comments": ["warn", "always"],
      "no-undef": "warn",
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  };