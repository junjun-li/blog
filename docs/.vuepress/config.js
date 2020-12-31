const path = require('path')
const fs = require('fs')
// function resolve(dir) {
//   return path.join(__dirname, '..', dir)
// }
module.exports = {
  port: '8900',
  title: 'junjun的小站',
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
    // 默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 themeConfig.displayAllHeaders 设置为 true 来显示所有页面的标题链接：
    // 默认展开所有页面的标题链接
    displayAllHeaders: true,
    nav: [
      { text: '大前端', link: '/frontend/' },
      { text: 'vue3', link: '/vue3/' },
      { text: 'web', link: '/web/apply、call、bind的区别' },
      { text: '数据结构和算法', link: '/algorithm/' },
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
      '/frontend/': [
        '/frontend/', 
        {
          title: '02-前端框架分类及选型',
          collapsable: false,
          path: '/frontend/02-前端框架分类及选型/koa',
          children: [
            '/frontend/02-前端框架分类及选型/koa',
            '/frontend/02-前端框架分类及选型/使用nodemailer配置邮件服务',
          ]
        },
        {
          title: '03-企业标准的开发环境搭建',
          collapsable: false,
          path: '/frontend/03-企业标准的开发环境搭建/docker',
          children: [
            '/frontend/03-企业标准的开发环境搭建/docker',
            '/frontend/03-企业标准的开发环境搭建/docker进阶',
            '/frontend/03-企业标准的开发环境搭建/linux的简单介绍',
          ]
        },
        {
          title: '04-必会的前端工程化工具',
          collapsable: false,
          path: '/frontend/04-必会的前端工程化工具',
          children: [
            '/frontend/04-必会的前端工程化工具/前端打包神器 webpack',
            '/frontend/04-必会的前端工程化工具/自动化工具 gulp',
            '/frontend/04-必会的前端工程化工具/Yeoman创建自己的脚手架',
          ]
        },
        {
          title: '05-NoSQL数据库的设计与集成',
          collapsable: false,
          path: '/frontend/05-NoSQL数据库的设计与集成/NoSQL数据库&设计原则',
          children: [
            '/frontend/05-NoSQL数据库的设计与集成/MongoDB简介&安装',
            '/frontend/05-NoSQL数据库的设计与集成/NoSQL数据库&设计原则',
            '/frontend/05-NoSQL数据库的设计与集成/mongoose使用简介',
          ]
        },
        {
          title: '08-团队协作-文档管理与缺陷控制',
          collapsable: false,
          path: '/frontend/08-团队协作-文档管理与缺陷控制',
          children: [
            '/frontend/08-团队协作-文档管理与缺陷控制/团队协作-版本管理',
            '/frontend/08-团队协作-文档管理与缺陷控制/ESLint',
            '/frontend/08-团队协作-文档管理与缺陷控制/git工具导学&git多密钥管理',
            '/frontend/08-团队协作-文档管理与缺陷控制/docker搭建gitlab平台',
          ]
        },
      ],
      '/algorithm/': [
        {
          title: '数据结构和算法',
          collapsable: false,
          path: '/algorithm/'
        },
        {
          title: 'js版',
          collapsable: false,
          children: ['/algorithm/js/js']
        },
        {
          title: 'java版',
          collapsable: false,
          children: ['/algorithm/java/java']
        }
      ],
      '/vue3/': [
        '/vue3/',
        '/vue3/vue3-basic',
        '/vue3/vue3-project',
        '/vue3/vue3-component'
      ],
      // '/react_study/': [
      //   '/react_study/',
      //   {
      //     collapsable: false,
      //     children: ['/react_study/React']
      //   },
      //   {
      //     collapsable: true,
      //     children: ['/react_study/redux']
      //   },
      //   // 这玩意没学
      //   {
      //     collapsable: false,
      //     children: ['/react_study/mobx']
      //   },
      //   {
      //     collapsable: false,
      //     children: ['/react_study/Next']
      //   },
      //   {
      //     title: 'XueCheng-Online',
      //     collapsable: false,
      //     children: [
      //       '/react_study/01项目说明',
      //       '/react_study/02框架搭建',
      //       '/react_study/03学生端功能实现',
      //       '/react_study/05注册功能'
      //     ]
      //   }
      // ],
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
    },
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    // repo: 'https://github.com/Mulander-J/Wiki1001Pro.git',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: 'GitHub',
    // 以下为可选的编辑链接选项
    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'https://github.com/Mulander-J/Wiki1001Dev',
    // 假如文档不是放在仓库的根目录下：
    // docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    // docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    // editLinks: true,
    // 默认为 "Edit this page"
    // editLinkText: '博主通道__GitHub Private Repo ！',
    // 文档更新时间：每个文件git最后提交的时间,
    lastUpdated: '最后编辑时间'
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
