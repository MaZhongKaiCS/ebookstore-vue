# 移动端电子书阅读器
### 前端技术栈

-  Vue2.x
-  Vue‐router
-  Vuex
-  Epub.js
-  Sass
- Nginx

### 项目描述

 本项目旨在打造电子阅读器，为用户在移动端上阅读 epub 格式的电子书提供了阅读环境。阅读器具备改变字体大小或样式、查看阅读进度、缓存样式、目录、书签、全文搜索等功能。

### 项目难点

书签功能的实现，处理展示多级目录问题，全文搜索功能的实现。

### 项目备忘录

1. 本项目的 Nginx 的使用是为了存放静态资源，包括字体样式，图书资源等等。

   Nginx 备忘录：

   1. mac 是使用 brew 安装的，首先确保电脑中有 brew，通过 ``brew -v`` 来查看。
   2. 通过 ``brew install nginx`` 安装
   3. 记住安装之后 Nginx 的安装路径，使用 ``vim 文件路径地址 ``，即可修改配置 Nginx 文件。
   4. 关闭 Nginx 操作：sudo nginx -s stop
   5. 重新加载、刷新 Nginx 操作：sudo nginx -s reload
   6. 修改之后检查 nginx 的语法：sudo nginx -t
   7. 开启 Nginx 操作：sudo nginx
   8. 在修改 配置 Nginx 中，新建一个端口号，指向存放静态资源的文件路径
   9. 访问不了得去查看一下 Nginx 文件中的 user 是否为本机用户名 + owner

2. 项目的运行：

   1. 打开开发工具的终端，记得切换到版本合适的 node.js
   2. ``npm i ``或者 ``cnpm i``，安装相关文件
   3. 运行：cnpm run serve
   4. 打开，8080端口，这里ip 地址需要根据 wifi 的 ip 地址来修改``.env.development``  文件
   5. 在 ip 地址后面需要手动填写想要阅读的电子书，输入``文件类别|书名``

3. 项目打包

   ``cnpm run build``

4. 项目上传 github

   首先提交到本地仓库：

   ``git add .``

   ``git commit -m"提交描述"``

   ``git push``

