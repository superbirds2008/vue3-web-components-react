# 在react中使用Vue3组件

## 目的

- 实现Vue3组件与React的互操作，使用`vue-custom-element`将Vue组件转换为Web组件，然后在React中使用。测试了vue组件与react组件的互操作，vue组件可以接收react传递的props，react组件也可以接收vue传递的event。
- 在react中使用单元测试和集成测试，分别使用test和react-testing-library进行测试。
- 进行前端测试，使用`playwright`进行端到端测试。
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

# 1. 打包vue组件
```bash
cd vue-web-component
npm install
npm run build
```
脚本会自动把打包好的组件放到react-app项目的`public`目录下
# 2. 打包react组件
```bash
cd react-app
npm install
```
# 3. 启动react项目进行测试
```bash
cd react-app
npm run start
```

# 4. 启动react项目进行测试
```bash
cd react-app
npm run test
```
# 5. 启动playwright进行端到端测试
```bash
cd react-app
npm run start
npm run test:playwright 
```
# 6. 启动全面测试
```bash
cd react-app
npm run start
npm run test:all
```