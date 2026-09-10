const config = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['apply', 'custom-variant', 'theme'] },
    ],
    'at-rule-prelude-no-invalid': null,
    'import-notation': null,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
  },
}

export default config
