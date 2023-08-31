# Create App

<sup>
    <a href="https://www.npmjs.com/package/latejs-app">
       <img src="https://img.shields.io/npm/v/latejs-app.svg" alt="npm package" />
    </a>
  </sup>

> Create App 支持 React 所需要的项目应用配置，内置采用了Webpack5来构建项目。

## Features

- ⚡快速构建项目应用
- 💪使用最精简的模板创建项目
- 📦默认 TS 支持，内置构建、ESLint、Prettier

## 环境准备

### Nodejs

在开始使用前，需要已经安装 `Nodejs`，并保证 `Nodejs` 版本不低于 14

推荐使用 Node.js 16 版本

```bash
node -v
# v16.15.1
```

### pnpm

推荐使用 `pnpm` 来管理项目的依赖：

```bash
npm install -g pnpm@8

pnpm -v
#8.6.3
```

## 安装

create-app 提供了 latejs-cli 工具来创建项目，cli脚手架项目地址：[`传送门`](https://github.com/laterly/latejs-cli)

可以不用全局安装，使用 npx 按需运行，创建一个目录为`my-app`的项目：

```bash
npx latejs-cli@latest create my-app
```

全局安装

```bash
npm install latejs-cli -g

late create my-app
```

## 初始化项目

latejs-cli 目前会提供一个React-Ts模板和Vue3-Ts模板，可以根据选项初始化项目：

```bash
✔ waiting fetch template
? Please choose a template to create project (Use arrow keys)
> React-Ts 
  Vue3-Ts
```

在生成项目后， latejs-cli 会自动初始 git init

```bash
Git初始化成功！

Successfully created project my-app
  cd my-app
  pnpm install
  pnpm dev
  pnpm build
  pnpm lint
  pnpm lint:style
```

创建的项目结构如下：

```
.
├─ .eslintcache
├─ .eslintrc.js
├─ .git
├─ .husky
├─ .npmrc
├─ .stylelintrc.js
├─ commitlint.config.js
├─ late.config.js
├─ package.json
├─ pnpm-lock.yaml
├─ prettier.config.js
├─ public
├─ readme.md
├─ src
│  ├─ app.tsx
│  ├─ assets
│  ├─ hooks
│  ├─ main.tsx
│  ├─ pages
│  │  └─ home
│  │     ├─ index.scss
│  │     └─ index.tsx
│  ├─ router
│  └─ store
│     ├─ app
│     │  └─ index.ts
│     └─ index.ts
└─ tsconfig.json

```

scripts命令：

```
  "scripts": {
    "dev": "late-app dev",
    "build": "late-app build",
    "lint": "late-app lint",
    "lint:style": "late-app lint:style",
    "prepare": "husky install"
  },
```

## 启动项目

执行 pnpm dev 即可启动项目：

```bash
$ pnpm dev

> late-app dev

App runing at:

  >Local:    http://localhost:3001
  >Network:  http://192.168.31.31:3001

Note that the development build is not optimized.
To create a production build, execute build command.

webpack compiled successfully
No errors found.
```

在浏览器中打开 <http://localhost:3000/>

## 使用配置

通过 latejs-cli 创建的 app 项目中，会默认生成 late.config.ts 文件。

可以通过该配置文件修改配置

```javascript
const path = require('path');

const { defineConfig } = require('latejs-app/lib/define');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = defineConfig({
  publicPath: isDevelopment ? '/' : './', //开发或生产环境服务的公共基础路径
  outputDir: 'dist', //生成的生产环境构建文件的目录
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
    extensions: [
      '.ts',
      '.tsx',
      '.json',
      '.js',
      '.vue',
      '.sass',
      '.scss',
      '.less',
    ],
    modules: [
      // 优化模块查找路径
      path.resolve('src'),
      path.resolve('node_modules'), // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
    ],
  },
  //设置环境变量
  env: {},
  devServer: {},
  //less-laoder配置
  less: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  //sass-loader配置
  sass: {},
});
```

## 构建项目

```bash
$ pnpm build

> late-app build

✔ Webpack
  Compiled successfully in 13.49s
```

构建产物默认生成到 dist/，可以将 dist/ 下的产物整理成服务器需要的结构，进行部署
