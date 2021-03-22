module.exports = {
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  semi: true, // 行位是否使用分号，默认为true
  trailingComma: 'all', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  parser: 'babylon', // 代码的解析引擎，默认为babylon，与babel相同。
  jsxBracketSameLine: true,
};
