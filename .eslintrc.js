module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: './tsconfig.json'
  },
  plugins: ["react", "import","@typescript-eslint", "prettier"],
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
    "react/prop-types": "off",
    "prettier/prettier": ["error", { "endOfLine": "auto" }]
  },
};
