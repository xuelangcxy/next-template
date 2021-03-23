module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-unused-vars': 'off',
    'max-depth': ['error', 3],
    'max-statements': ['error', 65],
    'max-nested-callbacks': [2, 3],
    'max-statements-per-line': [
      'error',
      {
        max: 1,
      },
    ],
    'max-params': ['error', 3],
    'max-lines-per-function': [
      2,
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'linebreak-style': ['off', 'windows'],
    'no-param-reassign': [0],
    camelcase: [0],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-shadow': [
      'error',
      {
        allow: ['next'],
      },
    ],
    'no-ignore': [0],
    'react/jsx-filename-extension': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/no-static-element-interactions': [
      0,
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],
    'jsx-a11y/click-events-have-key-events': null,
    'import/no-unresolved': [0],
    'import/no-dynamic-require': [0],
    'import/prefer-default-export': [0],
    'react/sort-prop-types': [
      2,
      {
        requiredFirst: true,
        callbacksLast: true,
      },
    ],
    'react/jsx-one-expression-per-line': [
      0,
      {
        allow: 'single-child',
      },
    ],
    'react/no-array-index-key': [0],
    'react/forbid-prop-types': [0],
    'react/jsx-handler-names': [0],
    'react/jsx-max-depth': [
      2,
      {
        max: 14,
      },
    ],
    'react/jsx-no-bind': [
      2,
      {
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-pascal-case': [2],
    'react/jsx-curly-brace-presence': [
      2,
      {
        props: 'never',
        children: 'never',
      },
    ],
    'react/no-direct-mutation-state': [2],
    'react/jsx-no-duplicate-props': [2],
    'class-methods-use-this': [0],
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
    'react/destructuring-assignment': ['never'],
    'react/prop-types': [
      'error',
      {
        ignore: [
          'dispatch',
          'store',
          'dvaStore',
          'children',
          'isServer',
          'inApp',
          'hhzToken',
          'router',
        ],
      },
    ],
    'react/display-name': [0],
    'react/no-danger': [0],
    'react/sort-comp': [
      2,
      {
        order: [
          // 'everything-else',
          // 'static-methods',
          // 'lifecycle',
          // 'instance-variables',
          // 'lifecycle',
          // 'instance-methods',
          'everything-else',
          // 'lifecycle',
          '/^on.+$/',
          '/^handle.+$/',
          'rendering',
        ],
        groups: {
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
  },
  overrides: [
    {
      files: ['pages/**/*.tsx'],
      rules: {
        'react/prop-types': [
          0,
          {
            ignore: [
              'dispatch',
              'store',
              'dvaStore',
              'children',
              'initialProps',
              'initialState',
            ],
          },
        ],
      },
    },
  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    wx: true,
    history: true,
  },
};
