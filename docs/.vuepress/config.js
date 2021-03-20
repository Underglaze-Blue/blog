// const fs = require('fs');
// const path = require('path');
// const js_filePath = path.resolve('./docs/js/');
//
// function handleChildren(basePath, arr){
//   return arr.map(item => {
//     return `/${basePath}/${item}`
//   })
// }
//
// const internal_path = fs.readdirSync(js_filePath).filter(item => item !== 'README.md')
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');


module.exports = {
  base: '/blog/',
  theme: require.resolve('../../theme-vdoing'),
  dest: 'dist',
  title: 'Blog',
  description: 'Lighting the way',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  markdown: {
    lineNumbers: true, // 代码行号
    extendMarkdown: md => {
      md.set({
        html: true
      })
      md.use(require('markdown-it-katex'))
    }
  },
  themeConfig,
  plugins
}
