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
  base: '/blog/',
  theme: 'reco',
  dest: 'dist',
  title: 'Blog',
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
    extendMarkdown: md => {
      md.set({
        html: true
      })
      md.use(require('markdown-it-katex'))
    }
  },
  themeConfig: {
    author: 'Himawari',
    authorAvatar: '/avatar.png',
    type: "blog",
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      },
      socialLinks: [     // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/Underglaze-Blue' },
      ]
    },
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
      {
        title: 'Lodash 源码分析',
        desc: 'Lodash 源码分析 - 个人写作',
        logo: "lodash.png",
        link: 'https://underglaze-blue.github.io/lodash-analysis/'
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
