const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
    publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "/", // 默认'/'，部署应用包时的基本 URL

    // 输出文件目录
    // outputDir: "dist",
    // 静态资源存放的文件夹(相对于outputDir)
    assetsDir: "static",
    // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)

    lintOnSave: false,   // 取消 eslint 验证

    runtimeCompiler: false,
    productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建

    devServer: {
        publicPath : '/',
        open: true,  // npm run serve后自动打开页面
        host: 'localhost',  // 匹配本机IP地址(默认是0.0.0.0)
        port: 8080, // 开发服务器运行端口号
        proxy: null,
        // 静态资源目录
        contentBase: [path.join(__dirname, 'data'), path.join(__dirname, 'assets')],
        // 静态资源访问路径
        contentBasePublicPath: ['/data', '/assets']
    },

    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
          .set("vue$", "vue/dist/vue.esm.js")
          .set("@", resolve("src"))
          .set("@assets", resolve("src/assets"))
          .set("@data", resolve("src/data"))
          .set("@scss", resolve("src/assets/scss"))
          .set("@components", resolve("src/components"))
          .set("@plugins", resolve("src/plugins"))
          .set("@views", resolve("src/views"))
          .set("@utils", resolve("src/utils"))
          .set("@router", resolve("src/router"))
          .set("@layouts", resolve("src/layouts"))
          .set("@static", resolve("static"));
      }
  }