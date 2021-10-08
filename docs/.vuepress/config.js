const path = require('path')
const fs = require('fs')
// function resolve(dir) {
//   return path.join(__dirname, '..', dir)
// }
console.log(path.join(__dirname, '../', '../', 'docs', 'img'))
module.exports = {
  port: '8900',
  title: '前端积累',
  description: '种一棵树最好的时间是十年前，其次就是现在。',
  markdown: {
    // 代码显示行数
    lineNumbers: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './', 'public'),
        $: path.join(__dirname, './', 'img')
        // '$': path.join(__dirname, '../', 'img')
        // '@/img': '../img/'
        // '@/img': path.join(__dirname, '../', '../', 'docs', 'img')
      }
    }
  },
  themeConfig: {
    // 默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 themeConfig.displayAllHeaders 设置为 true 来显示所有页面的标题链接：
    // 默认展开所有页面的标题链接
    displayAllHeaders: true,
    nav: [
      // { text: '新概念', link: '/newConcept/' },
      { text: '大前端', link: '/frontend/' },
      { text: '设计模式', link: '/js设计模式/' },
      { text: 'java', link: '/java/' },
      // { text: 'python', link: '/python/' },
      { text: 'vue2', link: '/vue2/' },
      { text: 'vue3', link: '/vue3/' },
      { text: 'web', link: '/web/apply、call、bind的区别' },
      { text: '数据结构和算法', link: '/algorithm/' },
      { text: 'web架构师', link: '/architect/' },
      { text: 'ts封装axios', link: '/ts/chapter1/' },
      { text: 'react', link: '/react/' },
      { text: 'webpack', link: '/webpack/' },
      { text: 'interview', link: '/interview/' },
      // { text: '数据可视化', link: '/datav_docs/' },

      {
        text: '了解更多',
        items: [{ text: '面试题', link: '/interview/' }]
      }
    ],
    sidebar: {
      '/newConcept/': ['/newConcept/', '/newConcept/Lesson5'],
      '/python/': [
        '/python/',
        {
          title: '01-基本数据类型',
          collapsable: false,
          path: '/python/01-基本数据类型/01-整数和浮点型',
          children: [
            {
              title: '01-整数和浮点型',
              collapsable: false,
              path: '/python/01-基本数据类型/01-整数和浮点型'
            },
            {
              title: '02-各进制的表示与转换',
              collapsable: false,
              path: '/python/01-基本数据类型/02-各进制的表示与转换'
            },
            {
              title: '03-数字布尔类型与复数',
              collapsable: false,
              path: '/python/01-基本数据类型/03-数字布尔类型与复数'
            }
          ]
        }
      ],
      '/js设计模式/': [
        '/js设计模式/',
        {
          title: '01-面向对象',
          collapsable: false,
          path: '/js设计模式/01-面向对象'
        },
        {
          title: '02-设计原则',
          collapsable: false,
          path: '/js设计模式/02-设计原则'
        },
        {
          title: '03-工厂模式',
          collapsable: false,
          path: '/js设计模式/03-工厂模式'
        },
        {
          title: '04-单例模式',
          collapsable: false,
          path: '/js设计模式/04-单例模式'
        },
        {
          title: '05-适配器模式',
          collapsable: false,
          path: '/js设计模式/05-适配器模式'
        },
        {
          title: '06-装饰器模式',
          collapsable: false,
          path: '/js设计模式/06-装饰器模式'
        },
        {
          title: '07-代理模式',
          collapsable: false,
          path: '/js设计模式/07-代理模式'
        },
        {
          title: '08-外观模式',
          collapsable: false,
          path: '/js设计模式/08-外观模式'
        },
        {
          title: '10-观察者模式',
          collapsable: false,
          path: '/js设计模式/10-观察者模式'
        }
      ],
      '/web/': [
        '/web/apply、call、bind的区别',
        {
          title: '正则表达式',
          collapsable: false,
          path: '/web/regular-expression'
        }
      ],
      '/ts/': [
        {
          title: '初识 TypeScript',
          collapsable: false,
          children: [
            ['/ts/chapter1/', 'Introduction'],
            '/ts/chapter1/install',
            '/ts/chapter1/start'
          ]
        },
        {
          title: 'TypeScript 常用语法',
          collapsable: false,
          children: [
            '/ts/chapter2/type',
            '/ts/chapter2/declare',
            '/ts/chapter2/interface',
            '/ts/chapter2/class',
            '/ts/chapter2/function',
            '/ts/chapter2/generic',
            '/ts/chapter2/inference',
            '/ts/chapter2/advance'
          ]
        },
        {
          title: 'ts-axios 项目初始化',
          collapsable: false,
          children: [
            '/ts/chapter3/require',
            '/ts/chapter3/init',
            '/ts/chapter3/base'
          ]
        },
        {
          title: 'ts-axios 基础功能实现',
          collapsable: false,
          children: [
            '/ts/chapter4/url',
            '/ts/chapter4/data',
            '/ts/chapter4/header',
            '/ts/chapter4/response',
            '/ts/chapter4/response-header',
            '/ts/chapter4/response-data'
          ]
        },
        {
          title: 'ts-axios 异常情况处理',
          collapsable: false,
          children: ['/ts/chapter5/error', '/ts/chapter5/enhance']
        },
        {
          title: 'ts-axios 接口扩展',
          collapsable: false,
          children: [
            '/ts/chapter6/extend',
            '/ts/chapter6/overload',
            '/ts/chapter6/generic'
          ]
        },
        {
          title: 'ts-axios 拦截器实现',
          collapsable: false,
          children: ['/ts/chapter7/interceptor']
        },
        {
          title: 'ts-axios 配置化实现',
          collapsable: false,
          children: [
            '/ts/chapter8/merge',
            '/ts/chapter8/transform',
            '/ts/chapter8/create'
          ]
        },
        {
          title: 'ts-axios 取消功能实现',
          collapsable: false,
          children: ['/ts/chapter9/cancel']
        },
        {
          title: 'ts-axios 更多功能实现',
          collapsable: false,
          children: [
            '/ts/chapter10/withCredentials',
            '/ts/chapter10/xsrf',
            '/ts/chapter10/upload-download',
            '/ts/chapter10/auth',
            '/ts/chapter10/validateStatus',
            '/ts/chapter10/paramsSerializer',
            '/ts/chapter10/baseURL',
            '/ts/chapter10/static'
          ]
        },
        {
          title: 'ts-axios 单元测试',
          collapsable: false,
          children: [
            '/ts/chapter11/preface',
            '/ts/chapter11/jest',
            '/ts/chapter11/helpers',
            '/ts/chapter11/requests',
            '/ts/chapter11/headers',
            '/ts/chapter11/instance',
            '/ts/chapter11/interceptor',
            '/ts/chapter11/mergeConfig',
            '/ts/chapter11/cancel',
            '/ts/chapter11/more'
          ]
        },
        {
          title: 'ts-axios 部署与发布',
          collapsable: false,
          children: ['/ts/chapter12/build-deploy', '/ts/chapter12/demo']
        },
        {
          title: '课程总结',
          collapsable: false,
          children: ['/ts/chapter13/summary']
        }
      ],
      '/java/': [
        '/java/',
        {
          title: '01-java基础语法',
          collapsable: false,
          path: '/java/01-java基础语法/01-hello-Java',
          children: [
            '/java/01-java基础语法/01-hello-Java',
            '/java/01-java基础语法/02-常量与变量',
            '/java/01-java基础语法/03-运算符',
            '/java/01-java基础语法/04-循环结构',
            '/java/01-java基础语法/05-一维数组',
            '/java/01-java基础语法/06-方法',
            '/java/01-java基础语法/07-面向对象',
            '/java/01-java基础语法/08-封装',
            '/java/01-java基础语法/09-继承',
            '/java/01-java基础语法/10-单例模式',
            '/java/01-java基础语法/11-多态',
            '/java/01-java基础语法/12-接口',
            '/java/01-java基础语法/13-内部类',
            '/java/01-java基础语法/14-异常',
            '/java/01-java基础语法/15-包装类',
            '/java/01-java基础语法/16-字符串',
            {
              title: 'Java-集合',
              collapsable: true,
              path: '/java/01-java基础语法/17-java-集合',
              children: [
                '/java/01-java基础语法/17-java-集合/01-List集合',
                '/java/01-java基础语法/17-java-集合/02-Set集合',
                '/java/01-java基础语法/17-java-集合/03-Map集合'
              ]
            },
            '/java/01-java基础语法/18-集合排序',
            '/java/01-java基础语法/19-泛型',
            '/java/01-java基础语法/20-进程'
          ]
        }
      ],
      '/vue2/': [
        '/vue2/',
        {
          title: '01-准备工作',
          collapsable: false,
          path: '/vue2/01-准备/01-flow',
          children: [
            '/vue2/01-准备/01-flow',
            '/vue2/01-准备/02-directory',
            '/vue2/01-准备/03-build',
            '/vue2/01-准备/04-entrance'
          ]
        }
      ],
      '/frontend/': [
        '/frontend/',
        {
          title: '02-前端框架分类及选型',
          collapsable: false,
          path: '/frontend/02-前端框架分类及选型/koa',
          children: [
            '/frontend/02-前端框架分类及选型/koa',
            '/frontend/02-前端框架分类及选型/使用nodemailer配置邮件服务'
          ]
        },
        {
          title: '03-企业标准的开发环境搭建',
          collapsable: false,
          path: '/frontend/03-企业标准的开发环境搭建/docker',
          children: [
            '/frontend/03-企业标准的开发环境搭建/docker',
            '/frontend/03-企业标准的开发环境搭建/docker进阶',
            '/frontend/03-企业标准的开发环境搭建/linux的简单介绍'
          ]
        },
        {
          title: '04-必会的前端工程化工具',
          collapsable: false,
          path: '/frontend/04-必会的前端工程化工具',
          children: [
            '/frontend/04-必会的前端工程化工具/前端打包神器 webpack',
            '/frontend/04-必会的前端工程化工具/自动化工具 gulp',
            '/frontend/04-必会的前端工程化工具/Yeoman创建自己的脚手架'
          ]
        },
        {
          title: '05-NoSQL数据库的设计与集成&Redis的安装与基本使用',
          collapsable: false,
          path: '/frontend/05-NoSQL数据库的设计与集成/MongoDB简介&安装',
          children: [
            '/frontend/05-NoSQL数据库的设计与集成/MongoDB简介&安装',
            '/frontend/05-NoSQL数据库的设计与集成/NoSQL数据库&设计原则',
            '/frontend/05-NoSQL数据库的设计与集成/mongoose使用简介',
            '/frontend/05-NoSQL数据库的设计与集成/Redis认知与必备CLI命令',
            '/frontend/05-NoSQL数据库的设计与集成/Redis和Node集成与实践',
            '/frontend/05-NoSQL数据库的设计与集成/Robo3T语法'
          ]
        },
        {
          title: '08-团队协作-版本管理',
          collapsable: false,
          path: '/frontend/08-团队协作-版本管理/团队协作-版本管理',
          children: [
            '/frontend/08-团队协作-版本管理/团队协作-版本管理',
            '/frontend/08-团队协作-版本管理/ESLint',
            '/frontend/08-团队协作-版本管理/git工具导学&git多密钥管理',
            '/frontend/08-团队协作-版本管理/docker搭建gitlab平台'
          ]
        },
        {
          title: '09-团队协作-自动化流程',
          collapsable: false,
          path: '/frontend/09-团队协作-自动化流程/jenkins安装及对接gitlab',
          children: [
            '/frontend/09-团队协作-自动化流程/jenkins安装及对接gitlab',
            '/frontend/09-团队协作-自动化流程/Dockerfile简介及使用'
          ]
        }
      ],
      '/architect/': [
        {
          title: '前言',
          collapsable: false,
          path: '/architect/'
        },
        {
          title: '01-脚手架架构设计和框架搭建',
          collapsable: false,
          children: [
            '/architect/01-脚手架涉及和框架搭建/01-开发脚手架的必要性',
            '/architect/01-脚手架涉及和框架搭建/02-脚手架的实现原理',
            '/architect/01-脚手架涉及和框架搭建/03-入门第一个脚手架',
            '/architect/01-脚手架涉及和框架搭建/04-Lerna简介',
            '/architect/01-脚手架涉及和框架搭建/05-Lerna源码解析'
          ]
        }
      ],
      '/algorithm/': [
        {
          title: '数据结构和算法',
          collapsable: false,
          path: '/algorithm/'
        },
        {
          title: '01-算法与数据结构基础',
          collapsable: false,
          children: [
            '/algorithm/01-算法与数据结构基础/01-线性查找法',
            '/algorithm/01-算法与数据结构基础/02-排序基础',
            '/algorithm/01-算法与数据结构基础/03-数据结构基础：不要小瞧数组',
            '/algorithm/01-算法与数据结构基础/04-栈和队列',
            '/algorithm/01-算法与数据结构基础/05-循环队列',
            '/algorithm/01-算法与数据结构基础/06-链表',
            '/algorithm/01-算法与数据结构基础/07-链表和递归',
          ]
        },
        {
          title: 'js版',
          collapsable: false,
          children: [
            '/algorithm/js/js',
            '/algorithm/js/反转单词',
            '/algorithm/js/计数二进制子串',
            '/algorithm/js/电话号码的字母组合'
          ]
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
        '/vue3/01-propType',
        '/vue3/02-.vue文件运行的原理',
        '/vue3/vue3-project',
        '/vue3/vue3-component'
      ],
      '/react/': [
        '/react/',
        {
          title: 'react-base',
          collapsable: false,
          path: '/react/base/01-react基础',
          children: [
            {
              title: '01-react基础',
              collapsable: false,
              path: '/react/base/01-react基础'
            },
            {
              title: '02-JSX笔记',
              collapsable: false,
              path: '/react/base/02-JSX笔记'
            },
            {
              title: '03-组件基础',
              collapsable: false,
              path: '/react/base/03-组件基础'
            },
            {
              title: '04-组件通讯',
              collapsable: false,
              path: '/react/base/04-组件通讯'
            },
            {
              title: '05-组件生命周期与高阶组件',
              collapsable: false,
              path: '/react/base/05-组件生命周期与高阶组件'
            },
            {
              title: '06-react原理解密',
              collapsable: false,
              path: '/react/base/06-react原理解密'
            },
            {
              title: '07-react路由',
              collapsable: false,
              path: '/react/base/07-react路由'
            },
            {
              title: '08-redux笔记',
              collapsable: false,
              path: '/react/base/08-redux笔记'
            }
          ]
        },
        {
          title: 'react-hooks重构旅游电商网站火车票',
          collapsable: false,
          path: '/react/01-react新特性',
          children: [
            {
              title: '01-react新特性',
              collapsable: false,
              path: '/react/01-react新特性'
            },
            {
              title: '02-react类组件的不足',
              collapsable: false,
              path: '/react/02-react类组件的不足'
            },
            {
              title: '03-react-hooks',
              collapsable: false,
              path: '/react/03-react-hooks'
            }
          ]
        }
      ],
      '/interview/': [
        '/interview/',
        '/interview/01-html和css',
        {
          title: '02-js基础',
          collapsable: false,
          path: '/interview/02-JS基础/01-变量类型和计算',
          children: [
            {
              title: '变量类型和计算',
              collapsable: false,
              path: '/interview/02-JS基础/01-变量类型和计算'
            },
            {
              title: '原型和原型链',
              collapsable: false,
              path: '/interview/02-JS基础/02-原型和原型链'
            },
            {
              title: '作用域和闭包',
              collapsable: false,
              path: '/interview/02-JS基础/03-作用域和闭包'
            },
            {
              title: '异步',
              collapsable: false,
              path: '/interview/02-JS基础/04-异步'
            },
            {
              title: '异步进阶1',
              collapsable: false,
              path: '/interview/02-JS基础/05-异步进阶1'
            },
            {
              title: '异步进阶2',
              collapsable: false,
              path: '/interview/02-JS基础/05-异步进阶2'
            },
            {
              title: 'Web-Api',
              collapsable: false,
              path: '/interview/02-JS基础/06-Web-Api'
            },
            {
              title: '运行环境',
              collapsable: false,
              path: '/interview/02-JS基础/07-运行环境'
            }
            // {
            //   title: '性能优化',
            //   collapsable: false,
            //   path: '/interview/02-JS基础/05-性能优化'
            // },
            // {
            //   title: 'web安全',
            //   collapsable: false,
            //   path: '/interview/02-JS基础/06-web安全'
            // },
            // {
            //   title: '浏览器的工作原理',
            //   collapsable: false,
            //   path: '/interview/02-JS基础/07-浏览器的工作原理'
            // }
          ]
        },
        {
          title: '03-Vue使用',
          collapsable: false,
          path: '/interview/03-Vue使用/01-基本使用',
          children: [
            {
              title: '01-基本使用',
              collapsable: false,
              path: '/interview/03-Vue使用/01-基本使用'
            },
            {
              title: '02-高级特性',
              collapsable: false,
              path: '/interview/03-Vue使用/02-高级特性'
            }
          ]
        },
        {
          title: '04-Vue原理',
          collapsable: false,
          path: '/interview/04-Vue原理',
          children: [
            {
              title: '01-如何理解MVVM',
              collapsable: false,
              path: '/interview/04-Vue原理/01-如何理解MVVM'
            },
            {
              title: '02-监听data变化的核心API是什么',
              collapsable: false,
              path: '/interview/04-Vue原理/02-监听data变化的核心API是什么'
            },
            {
              title: '03-如何监听数组的变化',
              collapsable: false,
              path: '/interview/04-Vue原理/03-如何监听数组的变化'
            },
            {
              title: '04-虚拟DOM',
              collapsable: false,
              path: '/interview/04-Vue原理/04-虚拟DOM'
            },
            {
              title: '05-用过虚拟DOM吗',
              collapsable: false,
              path: '/interview/04-Vue原理/05-用过虚拟DOM吗'
            },
            {
              title: '06-虚拟DOM-diff算法概述',
              collapsable: false,
              path: '/interview/04-Vue原理/06-虚拟DOM-diff算法概述'
            },
            {
              title: '07-深入diff算法源码',
              collapsable: false,
              path: '/interview/04-Vue原理/07-深入diff算法源码'
            },
            {
              title: '08-模板编译',
              collapsable: false,
              path: '/interview/04-Vue原理/08-模板编译'
            },
            {
              title: '09-vue组件是如何渲染和更新的',
              collapsable: false,
              path: '/interview/04-Vue原理/09-vue组件是如何渲染和更新的'
            },
            {
              title: '10-vue-router原理',
              collapsable: false,
              path: '/interview/04-Vue原理/10-vue-router原理'
            }
          ]
        },
        {
          title: '05-webpack',
          collapsable: false,
          path: '/interview/05-webpack',
          children: [
            {
              title: '01-配置多入口',
              collapsable: false,
              path: '/interview/05-webpack/01-配置多入口'
            },
            {
              title: '02-抽离压缩css文件',
              collapsable: false,
              path: '/interview/05-webpack/02-抽离压缩css文件'
            },
            {
              title: '03-抽离公共代码和第三方代码',
              collapsable: false,
              path: '/interview/05-webpack/03-抽离公共代码和第三方代码'
            },
            {
              title: '04-性能优化',
              collapsable: false,
              path: '/interview/05-webpack/04-性能优化'
            }
          ]
        }
      ],
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

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
