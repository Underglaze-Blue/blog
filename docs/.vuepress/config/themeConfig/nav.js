// nav
module.exports = [
  { text: '首页', link: '/' },
  // {
  //   text: '前端',
  //   link: '/web/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
  //   items: [
  //     {
  //       text: '学习笔记',
  //     },
  //   ],
  // },
  {
    text: '索引',
    link: '/categories/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  },
  {
    text: 'Link',
    items: [
      { text: 'Lodash  源码分析', link: 'https://underglaze-blue.github.io/lodash-analysis/'}
    ]
  },
  {
    text: 'Mozilla',
    link: 'https://developer.mozilla.org/zh-CN/'
  }
]
