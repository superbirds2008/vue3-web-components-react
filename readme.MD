# 在react中使用Vue3组件

## 目的
### 通过使用Vue3组件来实现React的功能，使用Vue3的`vue-custom-element`将Vue组件转换为Web组件，然后在React中使用。
- 实现Vue3组件与React的互操作，使用`vue-custom-element`将Vue组件转换为Web组件，然后在React中使用。测试了vue组件与react组件的互操作，vue组件可以接收react传递的props，react组件也可以接收vue传递的event。
### 通过CI/CD实现自动化测试和打包和部署

- 在react中使用单元测试和集成测试，分别使用test和react-testing-library进行测试。
- 进行前端测试，使用`playwright`进行端到端测试, 分别测chrome、firefox和webkit浏览器。
- 使用`npm run test:all`命令进行全面测试，包含单元测试、集成测试和端到端测试。
## 目录结构
```
├── react-app
│   ├── public
│   ├── src
│   ├── package.json
│   └── ...
├── vue-web-component
│   ├── src             
│   ├── package.json
│   └── ...
└── README.md
```
1. 打包vue组件
```bash
cd vue-web-component
npm install
npm run build
```
2. 对react项目进行lint检查
```bash
cd react-app
npm install
npm run lint 
```
检查出的告警示例
```
> npx eslint src

/Users/pengzhan/Documents/Documents/Dev/vue3-web-components-react/react-app/src/App.js
  1:8  warning  'React' is defined but never used  no-unused-vars

/Users/pengzhan/Documents/Documents/Dev/vue3-web-components-react/react-app/src/App.test.js
   6:1  warning  'test' is not defined    no-undef
   9:3  warning  'expect' is not defined  no-undef
  12:1  warning  'test' is not defined    no-undef
  23:3  warning  'expect' is not defined  no-undef
  26:1  warning  'test' is not defined    no-undef
  42:5  warning  'expect' is not defined  no-undef

/Users/pengzhan/Documents/Documents/Dev/vue3-web-components-react/react-app/src/index.js
  15:1  warning  Comments should not begin with a lowercase character  capitalized-comments
  16:1  warning  Comments should not begin with a lowercase character  capitalized-comments

/Users/pengzhan/Documents/Documents/Dev/vue3-web-components-react/react-app/src/setupTests.js
  1:1  warning  Comments should not begin with a lowercase character  capitalized-comments
  2:1  warning  Comments should not begin with a lowercase character  capitalized-comments
  3:1  warning  Comments should not begin with a lowercase character  capitalized-comments
  4:1  warning  Comments should not begin with a lowercase character  capitalized-comments
```

3. 启动react项目进行测试
```bash
cd react-app
npm run test
```

4. 安装并启动playwright二进制文件进行端到端测试
```bash
cd react-app
npx playwright install
npm run start
npm run test:playwright 
```

5. 启动全面测试
```bash
cd react-app
npm run start
npm run test:all
```

6. 打包react组件
```bash
cd react-app
npm run build 
```
脚本会自动把打包好的组件放到react-app项目的`public`目录下

7. 将react组件打包好的文件连通http服务器打包成镜像部署到demo服务器并启动镜像
