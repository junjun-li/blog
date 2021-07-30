# git 命令

- git rm --cached <file>

移除暂存区 到 工作区

- git reflog

可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）

## 版本穿梭

通过`git reset --hard <hash>`切换版本

切换后可以通过`git reflog`查看切换的记录

```shell
e-Junjun.Li@CQI145-LC1WB8JB MINGW64 ~/Desktop/git-demo (master)
# 查看记录
$ git reflog
7d99963 (HEAD -> master) HEAD@{0}: commit: 第三次提交
9a52def HEAD@{1}: commit: 第二次提交
153712f HEAD@{2}: commit (initial): 第一次提交

e-Junjun.Li@CQI145-LC1WB8JB MINGW64 ~/Desktop/git-demo (master)
# 切换版本
$ git reset --hard 9a52def
HEAD is now at 9a52def 第二次提交

e-Junjun.Li@CQI145-LC1WB8JB MINGW64 ~/Desktop/git-demo (master)
$ git reflog
# 切换的日志也能看见
9a52def (HEAD -> master) HEAD@{0}: reset: moving to 9a52def
7d99963 HEAD@{1}: commit: 第三次提交
9a52def (HEAD -> master) HEAD@{2}: commit: 第二次提交
153712f HEAD@{3}: commit (initial): 第一次提交
```

## 查看代码修改-diff

```shell
# 比较 工作区变更
git diff index.js
# 代码add了,比较暂存区加参数--cached
git diff --cached index.js

# 工作区 比较以前版本
git diff hash值
# 暂存区 比较以前版本
git diff --cached hash值


# 快速与最新版本代码比较
git diff HEAD

# 比较历史版本
git diff hash值1  hash值2
```

## 忽略文件权限：解决提示文件权限被修改问题

Git 在进行版本管理的时候，默认将文件权限也包含在内，但很多时候，我们可能并不需要让文件权限保持一致。比如当我们代码发布到生产服务器中，然后修改了某个文件的权限，当我们再次拉取代码时，如果这个文件正好有代码修改，这个时候 Git
就会提示文件冲突。

```shell
# 当前版本库
git config core.filemode false

# 所有的版本库，都忽略文件权限
git config --global core.fileMode false
```

## 分支

```shell
# 切换分支(分支名和远程分支名一样的话会自动关联)
# 远程和本地没有该分支则会报错
git checkout 分支名

# 新建一个远程和本地都不存在的分支方式,并且切换该分支
git checkout -b 分支名
```
