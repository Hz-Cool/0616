import { defineConfig } from "umi";
const myRouter = require("./src/routers/index").globeRouters.routes;

export default defineConfig({
  "404": true,
  base: "/",
  dva: {
    immer: true,
  },
  dynamicImport: {
    loading: "@/loading",
  },
  lessLoader: { javascriptEnabled: true },
  title: "test",
  theme: {
    // "@primary-color": "#203864",
    // "@text-color": "#202224",
  },
  runtimePublicPath: true,
  routes: myRouter,
  cssLoader: {},
  ignoreMomentLocale: true,
  hash: true,
  define: {
    // 添加这个自定义的环境变量
    "process.env.UMI_ENV": process.env.UMI_ENV, // * 本地开发环境：基本，测试服：dev，正式服：product
    "process.env.name": "测试",
    "process.env.proxyData": "https://t-api.xxx.com",
  },
  alias: {
    src: require("path").resolve(__dirname, "./src"),
  },
  chainWebpack: function (config, { webpack }) {
    config.module
      .rule("file")
      .test(/\.(xlsx?)(\?.*)?$/)
      .use("file-loader")
      .loader(require.resolve("file-loader"));
  },
  polyfill: {
    imports: ["core-js/stable"],
  },
  targets: {
    ie: 11,
  },
});
