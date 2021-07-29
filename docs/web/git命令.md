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

## 分支