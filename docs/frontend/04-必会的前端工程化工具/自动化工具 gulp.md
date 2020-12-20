# 自动化工具 gulp

[gulp 中文网](https://www.gulpjs.com.cn/)

## gulp flow

[![rUXL6S.png](https://s3.ax1x.com/2020/12/20/rUXL6S.png)](https://imgchr.com/i/rUXL6S)

## 起步

创建 gulpfile.js

```js
const { src, dest, series, watch } = require('gulp')
// 使我们更加方便的使用插件
// gulp-uglify => plugins.uglify = require('gulp-uglify')
const plugins = require('gulp-load-plugins')()

const gulpUglify = require('gulp-uglify')
const gulpLess = require('gulp-less')
const gulpAutoprefixer = require('gulp-autoprefixer')
// 注意:
// 只有 gulp-uglify || gulp-less 这种库, 才适用于 plugins.uglify || plugins.less 这种方式调用
// del是一个单独的库, 不能那样子使用
const del = require('del')

function js(cb) {
  src('src/*.js')
    // 下一个处理环节
    .pipe(gulpUglify())
    .pipe(dest('./dist/js'))
  cb()
}
function css(cb) {
  src('src/*.less')
    .pipe(gulpLess({ outputStyle: 'compressed' }))
    .pipe(
      gulpAutoprefixer({
        // 如果CSS未压缩，Autoprefixer是否应该使用可视级联。默认值：true
        cascade: false,
        // 应该Autoprefixer[删除过时的]前缀。默认值为true。
        remove: false
      })
    )
    .pipe(dest('./dist/css'))
  cb()
}
function watcher() {
  watch('src/*.js', js)
  watch('src/*.less', css)
}
function clean(cb) {
  del('./dist')
  cb()
}

// 使用npx gulp scripts 就可以编译js
exports.scripts = js
// 使用npx gulp styles 就可以编译 less
exports.styles = css
exports.clean = clean
// 使用npx gulp debugger 就可以按照顺序执行以下方法
exports.debugger = series([clean, js, css, watcher])
```

然后如下图所示, 更新文件之后, 就会自动执行编译打包

## gulp+browsersync 实现浏览器自动刷新

```shell
npm i browser-sync -D
```

[gulp+browsersync 的使用方式](https://browsersync.io/docs/gulp)

改写我们的`gulpfile.js`

```js
const {
  src,
  dest,
  series,
  watch,
} = require('gulp')
// 使我们更加方便的使用插件
// gulp-uglify => plugins.uglify = require('gulp-uglify')
const plugins = require('gulp-load-plugins')()

const gulpUglify = require('gulp-uglify')
const gulpLess = require('gulp-less')
const gulpAutoprefixer = require('gulp-autoprefixer')
// 注意:
// 只有 gulp-uglify || gulp-less 这种库, 才适用于 plugins.uglify || plugins.less 这种方式调用
// del是一个单独的库, 不能那样子使用
const del = require('del')

const browserSync = require('browser-sync')
  .create()
const reload = browserSync.reload

function js (cb) {
  src('src/*.js')
    // 下一个处理环节
    .pipe(gulpUglify())
    .pipe(dest('./dist/js'))
    .pipe(reload({ stream: true }))
  cb()
}
function css (cb) {
  src('src/*.less')
    .pipe(gulpLess({ outputStyle: 'compressed' }))
    .pipe(gulpAutoprefixer({
      // 如果CSS未压缩，Autoprefixer是否应该使用可视级联。默认值：true
      cascade: false,
      // 应该Autoprefixer[删除过时的]前缀。默认值为true。
      remove: false,
    }))
    .pipe(dest('./dist/css'))
    .pipe(reload({ stream: true }))
  cb()
}
function watcher () {
  watch('src/*.js', js)
  watch('src/*.less', css)
}
function clean (cb) {
  del('./dist')
  cb()
}

// server任务
function server (cb) {
  browserSync.init({
    server: {
      baseDir: './',
    },
  })
  cb()
}

// 使用npx gulp scripts 就可以编译js
exports.scripts = js
// 使用npx gulp styles 就可以编译 less
exports.styles = css
exports.clean = clean
// 使用npx gulp debugger 就可以按照顺序执行以下方法
exports.debugger = series([
  clean,
  js,
  css,
  server,
  watcher,
])

```

然后执行 `npm run build` 浏览器就能自动刷新了

[![raQiIs.png](https://s3.ax1x.com/2020/12/20/raQiIs.png)](https://imgchr.com/i/raQiIs)