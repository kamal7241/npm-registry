module.exports = {
  css: {
    extract: false,
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`,
      },
    },
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8080,
  },
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      ...config.optimization.get("splitChunks"),
      automaticNameDelimiter: "-",
    });
  },
};
