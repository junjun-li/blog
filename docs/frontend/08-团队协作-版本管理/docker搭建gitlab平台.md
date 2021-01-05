# docker 搭建 gitlab 平台

[GitLab Docker images](https://docs.gitlab.com/omnibus/docker/README.html)

## docker-compose 安装

国外有个小哥帮我们写好了, 包含创建备份, 回复备份, 发送邮件等服务, 我们拿来直接用, 修改一下端口和数据存放的目录就好了

[docker-gitlab](https://github.com/sameersbn/docker-gitlab/edit/master/docker-compose.yml)

```yml
version: '2.3'

services:
  redis:
    container_name: 'git-lab_redis'
    restart: always
    image: redis:5.0.9
    command:
      - --loglevel warning
    # 设置好数据存放的目录, 宿主机的目录
    volumes:
      - /docker-data/git-lab/redis-data:/var/lib/redis:Z

  postgresql:
    container_name: 'git-lab_postgresql'
    restart: always
    image: sameersbn/postgresql:12-20200524
    # 设置好数据存放的目录, 宿主机的目录
    volumes:
      - /docker-data/git-lab/postgresql-data:/var/lib/postgresql:Z
    environment:
      - DB_USER=gitlab
      - DB_PASS=password
      - DB_NAME=gitlabhq_production
      - DB_EXTENSION=pg_trgm,btree_gist

  gitlab:
    container_name: 'git-lab_gitlab'
    restart: always
    image: sameersbn/gitlab:13.7.1
    depends_on:
      - redis
      - postgresql
    # 端口的映射要改, 和下面对应
    ports:
      - '13800:80'
      - '13822:22'
    # 设置好数据存放的目录, 宿主机的目录
    volumes:
      - /docker-data/git-lab/gitlab-data:/home/git/data:Z
    healthcheck:
      test: ['CMD', '/usr/local/sbin/healthcheck']
      interval: 5m
      timeout: 10s
      retries: 3
      start_period: 5m
    environment:
      - DEBUG=false

      - DB_ADAPTER=postgresql
      - DB_HOST=postgresql
      - DB_PORT=5432
      - DB_USER=gitlab
      - DB_PASS=password
      - DB_NAME=gitlabhq_production

      - REDIS_HOST=redis
      - REDIS_PORT=6379

      - TZ=Asia/Kolkata
      - GITLAB_TIMEZONE=Kolkata
      # 这里改true, 代表自签名的模式
      - GITLAB_HTTPS=false
      - SSL_SELF_SIGNED=false
      # 这里改成云服务器的域名
      - GITLAB_HOST=121.37.183.14
      # gitlab的端口
      - GITLAB_PORT=13800
      # ssh的端口
      - GITLAB_SSH_PORT=13822
      - GITLAB_RELATIVE_URL_ROOT=
      # 下面, 配置一个随机的uuid即可
      - GITLAB_SECRETS_DB_KEY_BASE=96cb2eaf-a17a-4f4b-9544-ff628276df15
      - GITLAB_SECRETS_SECRET_KEY_BASE=3dc68cdd-a029-455f-9c12-fbc1342d9d75
      - GITLAB_SECRETS_OTP_KEY_BASE=20050308-0ce4-4982-9ee1-9901f39f8711
      # 管理员的密码必须要8位数
      - GITLAB_ROOT_PASSWORD=12345678
      # 管理员的邮箱
      - GITLAB_ROOT_EMAIL=11776174@qq.com

      - GITLAB_NOTIFY_ON_BROKEN_BUILDS=true
      - GITLAB_NOTIFY_PUSHER=false

      - GITLAB_EMAIL=notifications@example.com
      - GITLAB_EMAIL_REPLY_TO=noreply@example.com
      - GITLAB_INCOMING_EMAIL_ADDRESS=reply@example.com
      # 定时任务 每天晚上1点进行备份
      - GITLAB_BACKUP_SCHEDULE=daily
      - GITLAB_BACKUP_TIME=01:00
      # 会自动产生7天的备份, 第八天的时候, 会自动删除第一天的备份
      - GITLAB_BACKUP_EXPIRY=604800
      # SMTP服务 自己配置邮件服务, 我这里暂时不需要
      - SMTP_ENABLED=false
      - SMTP_DOMAIN=www.example.com
      - SMTP_HOST=smtp.gmail.com
      - SMTP_PORT=587
      - SMTP_USER=mailer@example.com
      - SMTP_PASS=password
      - SMTP_STARTTLS=true
      - SMTP_AUTHENTICATION=login

      - IMAP_ENABLED=false
      - IMAP_HOST=imap.gmail.com
      - IMAP_PORT=993
      - IMAP_USER=mailer@example.com
      - IMAP_PASS=password
      - IMAP_SSL=true
      - IMAP_STARTTLS=false

      - OAUTH_ENABLED=false
      - OAUTH_AUTO_SIGN_IN_WITH_PROVIDER=
      - OAUTH_ALLOW_SSO=
      - OAUTH_BLOCK_AUTO_CREATED_USERS=true
      - OAUTH_AUTO_LINK_LDAP_USER=false
      - OAUTH_AUTO_LINK_SAML_USER=false
      - OAUTH_EXTERNAL_PROVIDERS=

      - OAUTH_CAS3_LABEL=cas3
      - OAUTH_CAS3_SERVER=
      - OAUTH_CAS3_DISABLE_SSL_VERIFICATION=false
      - OAUTH_CAS3_LOGIN_URL=/cas/login
      - OAUTH_CAS3_VALIDATE_URL=/cas/p3/serviceValidate
      - OAUTH_CAS3_LOGOUT_URL=/cas/logout

      - OAUTH_GOOGLE_API_KEY=
      - OAUTH_GOOGLE_APP_SECRET=
      - OAUTH_GOOGLE_RESTRICT_DOMAIN=

      - OAUTH_FACEBOOK_API_KEY=
      - OAUTH_FACEBOOK_APP_SECRET=

      - OAUTH_TWITTER_API_KEY=
      - OAUTH_TWITTER_APP_SECRET=

      - OAUTH_GITHUB_API_KEY=
      - OAUTH_GITHUB_APP_SECRET=
      - OAUTH_GITHUB_URL=
      - OAUTH_GITHUB_VERIFY_SSL=

      - OAUTH_GITLAB_API_KEY=
      - OAUTH_GITLAB_APP_SECRET=

      - OAUTH_BITBUCKET_API_KEY=
      - OAUTH_BITBUCKET_APP_SECRET=

      - OAUTH_SAML_ASSERTION_CONSUMER_SERVICE_URL=
      - OAUTH_SAML_IDP_CERT_FINGERPRINT=
      - OAUTH_SAML_IDP_SSO_TARGET_URL=
      - OAUTH_SAML_ISSUER=
      - OAUTH_SAML_LABEL="Our SAML Provider"
      - OAUTH_SAML_NAME_IDENTIFIER_FORMAT=urn:oasis:names:tc:SAML:2.0:nameid-format:transient
      - OAUTH_SAML_GROUPS_ATTRIBUTE=
      - OAUTH_SAML_EXTERNAL_GROUPS=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_EMAIL=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_NAME=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_USERNAME=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_FIRST_NAME=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_LAST_NAME=

      - OAUTH_CROWD_SERVER_URL=
      - OAUTH_CROWD_APP_NAME=
      - OAUTH_CROWD_APP_PASSWORD=

      - OAUTH_AUTH0_CLIENT_ID=
      - OAUTH_AUTH0_CLIENT_SECRET=
      - OAUTH_AUTH0_DOMAIN=
      - OAUTH_AUTH0_SCOPE=

      - OAUTH_AZURE_API_KEY=
      - OAUTH_AZURE_API_SECRET=
      - OAUTH_AZURE_TENANT_ID=

volumes:
  redis-data:
  postgresql-data:
  gitlab-data:
```

使用命令运行, docker 会帮我们拉取很多镜像, 一般需要 3-5 分钟, 取决于服务器性能

```shell
docker-compose up -d
```

:::tip
记住服务器要放行端口, 否则无法访问
:::

我已经 ok 了, ssh 和 https 拉取代码的端口也和我们配置的一样

[![rIWar9.png](https://s3.ax1x.com/2020/12/27/rIWar9.png)](https://imgchr.com/i/rIWar9)

## [docker-compose 运维 gitlab 平台：备份&恢复](https://class.imooc.com/lesson/1164#mid=28121)

## [gitlab 的权限介绍&组权限控制&分支保护](https://class.imooc.com/lesson/1164#mid=28122)
