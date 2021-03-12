# 智语后台管理系统前端部分的抽离
## 1.工程描述

此项目抽离出后台管理的前端部分，为更好实现的前后端分离。同时也对一部分的静态资源做了优化。

## 2.环境准备

此工程运行要求本机node版本在 10.15.1及以上更高版本。

## 3.在master分支上进行项目开发 

```bash
git@172.16.5.77:fangjiechen/APP_Admin_HTML5.git
cd "APP_Admin_HTML5"
npm install
```

Now, you can build or start the project
- 将所有的源代码打包到 `dist`文件夹  via `npm run build`, [查看更多](#31-npm-run-build)
- 运行项目 via `npm run dev`, [查看更多](#32-npm-run-dev)

项目结构图：
```
shareHTML5_webpack
    │  .babelrc  //babel的配置文件。此处babel主要作用是兼容es6（es2016 es2017 es2018等）
    │  .eslintrc.js  //eslint配置文件。主要功能是检查缩进、换行等格式问题
    │  .gitignore  //git配置文件。项目提交配置不上传工程的文件或者文件夹
    │  package-lock.json //由package.json更新而来
    │  package.json //项目所需要的依赖包
    │  postcss.config.js //优化css配置文件
    │  webpack.config.js //全局根据当前环境，取对应的配置文件
    │  
    ├─app //工程所有原生的资源
    │  │  favicon.ico
    │  │  
    │  ├─assets //静态第三方css、js、fonts等
    │  │  ├─css
    │  │  │  │  bootstrap.min.css
    │  │  │  │  ...
    │  │  │  │  
    │  │  │  └─images
    │  │  │      │  ajax-loader.gif
    │  │  │      │  
    │  │  │      ├─icons-png
    │  │  │      │      action-black.png
    │  │  │      │      ...
    │  │  │      │      
    │  │  │      └─icons-svg
    │  │  │              action-black.svg
    │  │  │              ...
    │  │  │              
    │  │  ├─fonts
    │  │  │  │  glyphicons-halflings-regular.eot
    │  │  │  │  ...
    │  │  │  │  
    │  │  │  ├─codropsicons
    │  │  │  │      codropsicons.eot
    │  │  │  │      ...
    │  │  │  │      
    │  │  │  └─stroke7pixeden
    │  │  │          stroke7pixeden.eot
    │  │  │          ...
    │  │  │          
    │  │  ├─img
    │  │  │      01.png
    │  │  │      02.png
    │  │  │      ...
    │  │  │      
    │  │  └─js
    │  │      │  crypto-js.js
    │  │      │  ...
    │  │      │  
    │  │      └─images
    │  │          │  ajax-loader.gif
    │  │          │  
    │  │          ├─icons-png
    │  │          │      action-black.png
    │  │          │      ...
    │  │          │      
    │  │          └─icons-svg
    │  │                  action-black.svg
    │  │                  ...
    │  │                  
    │  ├─css //各页面会调用的css
    │  │      404.css
    │  │      ...
    │  │      
    │  ├─fonts //css中引用的字体文件
    │  │  │  glyphicons-halflings-regular.eot
    │  │  │  ...
    │  │  │  
    │  │  ├─codropsicons
    │  │  │      codropsicons.eot
    │  │  │      ...
    │  │  │      
    │  │  └─stroke7pixeden
    │  │          stroke7pixeden.eot
    │  │          ...
    │  │          
    │  ├─html //页面模板
    │  │      404.html
    │  │      ...
    │  │      
    │  ├─img //html或者css中直接引用的图片
    │  │      01.png
    │  │      ...
    │  │      
    │  └─js //各页面js文件、公共js文件、
    │      │  404.js
    │      │  ...
    │      │  
    │      └─js
    │          ├─common
    │          │      cnzz.js
    │          │      ...
    │          │      
    │          ├─component
    │          │      browserCheck.js
    │          │      ...
    │          │      
    │          ├─layer
    │          │  │  layer.js
    │          │  │  
    │          │  ├─mobile
    │          │  │  │  layer.js
    │          │  │  │  
    │          │  │  └─need
    │          │  │          layer.css
    │          │  │          
    │          │  └─skin
    │          │      └─default
    │          │              icon-ext.png
    │          │              ...
    │          │              
    │          └─vendor
    │                  bootstrap.min.js
    │                  ...
    │                  
    ├─config //各环境的配置文件
    │      config.js
    │      ...
    │      
    └─dist //打包后的文件，结构和原生结构保持一致
        │  404.html
        │  ...
        │  
        ├─assets
        │  ├─css
        │  │  │  bootstrap.min.css
        │  │  │  ...
        │  │  │  
        │  │  └─images
        │  │      │  ajax-loader.gif
        │  │      │  
        │  │      ├─icons-png
        │  │      │      action-black.png
        │  │      │      ...
        │  │      │      
        │  │      └─icons-svg
        │  │              action-black.svg
        │  │              ...
        │  │              
        │  ├─fonts
        │  │  │  glyphicons-halflings-regular.eot
        │  │  │  ...
        │  │  │  
        │  │  ├─codropsicons
        │  │  │      codropsicons.eot
        │  │  │      ...
        │  │  │      
        │  │  └─stroke7pixeden
        │  │          stroke7pixeden.eot
        │  │          ...
        │  │          
        │  ├─img
        │  │      01.png
        │  │      ...
        │  │      
        │  └─js
        │      │  crypto-js.js
        │      │  ...
        │      │  
        │      └─images
        │          │  ajax-loader.gif
        │          │  
        │          ├─icons-png
        │          │      action-black.png
        │          │      ...
        │          │      
        │          └─icons-svg
        │                  action-black.svg
        │                  ...
        │                  
        ├─css
        │      2.36ca400fb03279306e7d.css
        │      3.845c11bdafd328f9f1ea.css
        │      ...
        │      
        ├─font
        │      glyphicons-halflings-regular.eot
        │      ...
        │      
        ├─img
        │      06.png
        │      ...
        │      
        └─js
                0.bundle.897eff059527644db601.js
                ...
                activity.bundle.897eff059527644db601.js
                ...
```
- app:所有原始的文件将被放在此目录下 
- dist:目标文件夹存放打包后的文件 

## 3.1 npm run build

将工程克隆到本地并安装好所需依赖后，执行代码，将css/js等文件进行压缩，并输出到dist文件夹下:

```bash
npm run build
```

此时，可能会在控制台碰到一些 node/npm version error 等情况，这可能是由于在之前安装依赖的时候，因网速等原因，npm install中断了，
从而没有将我们所需要的所有依赖包全加到我们的本地工程中。遇到这类情况时，可以尝试安装cnpm:

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

安装成功cnpm之后，可以运行:

```bash
cnpm run build
```

## 3.2 npm run dev

依赖`webpack` and `webpack-dev-server`,项目可以在当前资源条件下启动，并在不重启的情况下监听变化,非常适合开发时的需求。

```bash
cnpm run dev
```

## 3.3 如果需要在后期添加依赖包或者更新依赖包的方案

### 3.3.1 npm install xx –save-dev

单独添加或者更新某个依赖包

### 3.3.2 npm install

全局更新依赖





