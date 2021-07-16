module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: ['prettier', 'plugin:vue/recommended'],
  plugins: ['prettier', 'vue']
};
