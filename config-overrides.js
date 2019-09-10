const {override, fixBabelImports, addLessLoader,addDecoratorsLegacy,addWebpackAlias} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',

        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    }),
    //添加babel插件支持装饰器  语法：简化高阶组件的使用
    addDecoratorsLegacy(),
    //配置路径别名  简化路径
    addWebpackAlias({

    })
);