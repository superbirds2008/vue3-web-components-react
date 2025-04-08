// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";

export default [
  // 全局环境（浏览器、ES2021 等）
  {
    languageOptions: {
      globals: globals.browser,
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false, // 使用 babel parser 时必须加这个
      },
    },
  },

  // JavaScript 推荐规则
  pluginJs.configs.recommended,

  // React 插件及规则
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/jsx-uses-react": "off", // React 17+ 不需要 import React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "warn",
      "react/prop-types": "off",
      "capitalized-comments": ["warn", "always"],
    },
    settings: {
      react: {
        version: "detect", // 自动检测 React 版本
      },
    },
  },
];