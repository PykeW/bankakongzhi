# 板卡控制软件前端

## 简介
该项目是一个基于 React 和 Ant Design 的参数配置界面，旨在提供用户友好的界面来管理和配置不同的参数设置。项目包含多个模块，如轴配置、速度配置、视觉配置等。

## 目录结构
```
项目根目录
│
├── public
│   └── index.html
│
├── src
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   │   └── styles
│   │       └── variables.css
│   │       └── global.css
│   │
│   ├── components
│   │   ├── AxisConfig
│   │   │   ├── AxisConfig.jsx
│   │   │   └── AxisConfig.css
│   │   │
│   │   ├── SpeedConfig
│   │   │   ├── SpeedConfig.jsx
│   │   │   └── SpeedConfig.css
│   │   │
│   │   ├── VisionConfig
│   │   │   ├── VisionConfig.jsx
│   │   │   └── VisionConfig.css
│   │   │
│   │   ├── TopNav
│   │   │   ├── TopNav.jsx
│   │   │   └── TopNav.css
│   │   │
│   │   ├── BottomControls
│   │   │   ├── BottomControls.jsx
│   │   │   └── BottomControls.css
│   │   │
│   │   ├── TestParams
│   │   │   ├── TestParams.jsx
│   │   │   └── TestParams.css
│   │   │
│   │   └── common
│   │       ├── Button.jsx
│   │       └── Input.jsx
│   │
│   ├── hooks
│   │   └── useWindowSize.js
│   │
│   ├── utils
│   │   └── helpers.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```
## 目录说明
* public: 存放静态文件，如 index.html。
* src: 项目源代码目录。
    * assets: 存放项目的静态资源，如图片和全局样式。
        * images: 存放图片资源。
        * styles: 存放全局 CSS 文件和变量。
    * components: 存放所有 React 组件。
        * AxisConfig, SpeedConfig, VisionConfig: 各个配置模块的组件及其样式。
        * TopNav, BottomControls, TestParams: 其他功能组件及其样式。
        * common: 存放通用组件，如按钮和输入框。
    * hooks: 自定义 React hooks。
    * utils: 工具函数和辅助方法。
    * App.jsx: 主应用组件。
    * main.jsx: 应用入口文件。

## 设计规划
### 目标
- 提供一致且直观的用户界面。
- 支持多种参数配置模块。
- 确保响应式设计，适应不同屏幕尺寸。

### 设计原则
* 模块化: 每个功能模块都有自己的目录，包含组件和样式文件。
* 可重用性: 将通用组件和样式抽离到 common 和 assets 中。
* 可维护性: 使用自定义 hooks 和工具函数来简化代码逻辑。

### 组件设计
1. TopNav: 顶部导航栏，提供模块切换功能。
2. AxisConfig: 轴配置模块，管理轴的相关参数。
3. SpeedConfig: 速度配置模块，管理速度相关参数。
4. VisionConfig: 视觉配置模块，管理视觉相关参数。
5. BottomControls: 底部控制栏，提供全局操作按钮。
6. TestParams: 测试参数模块，提供测试相关的参数设置。

### 样式设计
* 使用 CSS 变量统一管理颜色和字体。
* 确保所有组件的间距和布局一致。
* 使用 Ant Design 的组件库，确保一致的 UI 风格。

### 功能规划
* 模块切换: 通过顶部导航栏切换不同的配置模块。
* 参数管理: 在每个模块中，用户可以查看和编辑相关参数。
* 实时更新: 参数更改后，界面实时更新显示。
* 响应式设计: 确保在不同设备上都有良好的用户体验。

### 开发步骤
1. 设置项目环境: 使用 Vite 初始化项目，安装 React 和 Ant Design。
2. 创建目录结构: 按照设计的目录结构创建文件夹和文件。
3. 开发组件: 从 components 目录开始，逐个开发和测试组件。
4. 样式设计: 使用 CSS 变量和全局样式文件统一管理样式。
5. 功能实现: 使用 hooks 和工具函数实现复杂的功能逻辑。
6. 测试和优化: 确保每个组件在不同设备上都能正常工作。
通过这种结构和设计，项目将具有良好的可扩展性和可维护性。

