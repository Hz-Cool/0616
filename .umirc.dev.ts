import { defineConfig } from "umi";
const myRouter = require("./src/routers/index").globeRouters.routes;

export default defineConfig({
  "404": true,
  define: {},
  base: "/0616",
  dva: {
    immer: true,
  },
  dynamicImport: {
    loading: "@/loading",
  },
  title: "test",
  theme: {
    // "@primary-color": "#203864",
    // "@text-color": "#202224",
  },
  // runtimePublicPath:true,
  publicPath: "/0616/", //示例链接 此处替换发布环境
  routes: myRouter,
  // exportStatic: {},
  cssLoader: {},
  ignoreMomentLocale: true,
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
  hash: true,
  targets: {
    ie: 11,
  },
});
