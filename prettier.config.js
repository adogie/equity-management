module.exports = {
  printWidth: 200, // 每行代码最大长度
  tabWidth: 2, // 一个tab代表几个空格数，默认为80
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  semi: false, // 声明后带分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 不允许围绕非严格要求的对象字面值属性名称进行引号
  jsxSingleQuote: false, // 使用单引号
  trailingComma: 'none', // 结尾不加逗号
  bracketSpacing: true, // 括号空格
  jsxBracketSameLine: false, // // 在jsx中把'>' 是否单独放一行
  arrowParens: 'always', // 箭头函数参数周围加上括号
  htmlWhitespaceSensitivity: 'ignore', // 空格被认为是不敏感的
  vueIndentScriptAndStyle: false, // 缩进Vue文件中的脚本和样式标签
  endOfLine: 'auto' // 设置统一的行结尾样式,仅换行（\ n），在Linux和macOS以及git repos内部通用
}
