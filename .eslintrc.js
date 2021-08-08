module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'indent': [2, 2],
    'quotes': [2, 'single'],
    'semi': ['error', 'never'],
  }
}
