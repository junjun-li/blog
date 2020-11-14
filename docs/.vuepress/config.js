const path = require('path')
const fs = require('fs')
// function resolve(dir) {
//   return path.join(__dirname, '..', dir)
// }
module.exports = {
  port: '8900',
  title: '标题',
  description: '描述',
  markdown: {
    // 代码显示行数
    lineNumbers: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './', 'public')
        // '@': path.join(__dirname, '../', '../', 'docs')
      }
    }
  },
  themeConfig: {
    nav: [
      { text: '前端积累', link: '/web_accumulate/JS' },
      { text: 'vue3', link: '/vue3/' },
      { text: 'react', link: '/react_study/' },
      { text: 'webpack', link: '/webpack/' },
      { text: '数据可视化', link: '/datav_docs/' },

      {
        text: '了解更多',
        items: [
          { text: 'Markdown教程', link: '/markdown/' },
          { text: '面试题', link: '/interview/' }
        ]
      }
    ],
    sidebar: {
      collapsable: false,
      '/web_accumulate/': [
        '/web_accumulate/JS',
        '/web_accumulate/CSS',
        '/web_accumulate/Vue'
        // '/web_accumulate/css/', 这个路径查找 web_accumulate=>css文件夹=>README.md文件
      ],
      '/vue3/': [
        '/vue3/',
        '/vue3/vue3-basic',
        '/vue3/vue3-project',
        // {
        //   title: 'vue3项目起航',
        //   collapsable: false,
        //   children: [
        //     '/vue3/vue3-project'
        //   ]
        // }
      ],
      // '/webpack/': [
      //   '/webpack/',
      //   {
      //     collapsable: false,
      //     children: ['/webpack/基本使用'],
      //   },
      // ],
      '/react_study/': [
        '/react_study/',
        {
          collapsable: false,
          children: ['/react_study/React']
        },
        {
          collapsable: true,
          children: ['/react_study/redux']
        },
        // 这玩意没学
        {
          collapsable: false,
          children: ['/react_study/mobx']
        },
        {
          collapsable: false,
          children: ['/react_study/Next']
        },
        {
          title: 'XueCheng-Online',
          collapsable: false,
          children: [
            '/react_study/01项目说明',
            '/react_study/02框架搭建',
            '/react_study/03学生端功能实现',
            '/react_study/05注册功能'
          ]
        }
      ],
      '/markdown/': ['/markdown/'],
      '/interview/': ['/interview/'],
      '/webpack/': [
        '/webpack/',
        {
          collapsable: false,
          children: ['/webpack/webpack1']
        }
      ],
      '/datav_docs/': [
        '/datav_docs/',
        {
          collapsable: false,
          children: ['/datav_docs/svg', '/datav_docs/svgAnimation']
        }
      ]
    }
  }
}
function genSidebarConfig(dir, hasSub) {
  let p = path.join(__dirname, '../', dir)
  let files = fs.readdirSync(p)
  let subDir = hasSub ? dir.split('/')[1] : ''
  files = files.map(item => {
    item = subDir
      ? subDir + '/' + path.basename(item, '.md')
      : path.basename(item, '.md')
    return item
  })
  return files
}
