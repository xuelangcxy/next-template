module.exports = {
  presets: [
    [
      'next/babel',
      {
        'transform-runtime': {
          useESModules: false,
        },
        'styled-jsx': {
          plugins: ['styled-jsx-plugin-less', 'styled-jsx-plugin-postcss'],
        },
      },
    ],
  ],
  plugins: [
    // ['import', { libraryName: 'antd', style: true }, 'antd'],
    ['import', { libraryName: 'antd-mobile', style: 'css' }, 'antd-mobile'],
  ],
  compact: false,
};
