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
  title: '-.-',
  description: 'Lighting the way',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'
    }],
    ['link', {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"
    }]
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
