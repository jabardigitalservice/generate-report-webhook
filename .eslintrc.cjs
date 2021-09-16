module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    use: true
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
  }
}