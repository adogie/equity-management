/**
 * @description vue.config.js全局配置
 */
const path = require('path')
const { publicPath, assetsDir, outputDir, lintOnSave, transpileDependencies, title, abbreviation, devPort, providePlugin, build7z } = require('./src/config')
const { version, name } = require('./package.json')
const Webpack = require('webpack')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const dayjs = require('dayjs')
const date = dayjs().format('YYYY_M_D')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_NAME = name
process.env.VUE_APP_TITLE = title
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

const resolve = (dir) => path.join(__dirname, dir)

const devServer = {
  hot: true,
  port: devPort,
  historyApiFallback: true,
  allowedHosts: 'all',
  client: { overlay: false },
  proxy: { '/api': { target: `http://192.168.112.105:9700`, changeOrigin: true } }
}

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer,
  configureWebpack() {
    return {
      resolve: {
        // 配置alias简称
        alias: {
          '@': resolve('src'),
          '*': resolve('')
        }
      },
      plugins: [new Webpack.ProvidePlugin(providePlugin)]
    }
  },
  chainWebpack(config) {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]'
    })

    config.resolve.symlinks(true)

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('source-map')
    })

    if (build7z) {
      config.when(process.env.NODE_ENV === 'production', (config) => {
        config
          .plugin('fileManager')
          .use(FileManagerPlugin, [
            {
              onEnd: {
                delete: [`./${outputDir}/video`, `./${outputDir}/data`],
                archive: [
                  {
                    source: `./${outputDir}`,
                    destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`
                  }
                ]
              }
            }
          ])
          .end()
      })
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    sourceMap: true,
    // 全局样式
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#1677ff'
          }
        }
      }
    }
  }
}
