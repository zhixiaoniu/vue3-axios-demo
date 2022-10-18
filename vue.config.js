const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/index':{
        target:"http://www.vue3demo.com/index.php?s=",
        changeOrigin: true
      }
    }
  }
})
