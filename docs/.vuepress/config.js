const fs = require('fs');
const path = require('path');
const js_filePath = path.resolve('./docs/js/');

function handleChildren(basePath, arr){
  return arr.map(item => {
    return `/${basePath}/${item}`
  })
}

const internal_path = fs.readdirSync(js_filePath).filter(item => item !== 'README.md')


module.exports = {
  base: '/lodash-analysis/',
  theme: 'reco',
  dest: 'dist',
  title: 'Lodash 源码分析',
  description: 'Analysis lodash.js deeply',
  head: [
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
    extendMarkdown: md => {
      md.set({
        html: true
      })
      md.use(require('markdown-it-katex'))
    }
  },
  themeConfig: {
    smoothScroll: true,
    repo: 'Underglaze-Blue/lodash-analysis',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: ' 在 GitHub 上编辑此页',
    lastUpdated: ' 上次更新',
    docsBranch: 'main',
    searchMaxSuggestions: 10,
    nav: [
      {
        text: 'Lodash',
        items: [
          { text: 'Lodash文档', link: 'https://www.lodashjs.com/' },
          { text: 'Lodash GitHub', link: 'https://github.com/lodash/lodash' }
        ]
      },
      {
        text: 'Mozilla',
        link: 'https://developer.mozilla.org/zh-CN/'
      }
    ],
    sidebar: [
      {
        title: 'Internal',   // 必要的
        collapsable: true,
        sidebarDepth: 0,
        children: handleChildren('internal', internal_path)
      }
    ]
  },
  // plugins: ["@vuepress/medium-zoom"]
  plugins: {
    '@vuepress/medium-zoom': {
      selector: '.content__default img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16,
        background: '#000'
      }
    }
  }
}
