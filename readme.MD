# 在react中使用Vue3组件

## 目的

实现Vue3组件与React的互操作，使用`vue-custom-element`将Vue组件转换为Web组件，然后在React中使用。测试了vue组件与react组件的互操作，vue组件可以接收react传递的props，react组件也可以接收vue传递的event。
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

# 1. 安装依赖
```bash
cd vue-web-component
npm install
npm run build
```
脚本会自动把打包好的组件放到react-app项目的`public`目录下
# 2. 在react中使用
```bash
cd react-app
npm install
```
# 3. 启动react
```bash
cd react-app
npm run start
```