// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md

'use strict';

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'never'],
    'trailer-exists': [2, 'always', 'Signed-off-by:'],
    'body-max-line-length': [0, 'never'],
  },
};
