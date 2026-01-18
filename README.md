# LaTeX 交互式闯关学习助手 (LaTeX Learning Tool)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-stable-green.svg)

这是一个基于 Web 的交互式 LaTeX 学习工具，旨在通过“闯关游戏”的方式，帮助零基础用户快速掌握 LaTeX 学术排版的核心技能。

项目采用 Monorepo 架构，前端使用 React + Monaco Editor，后端使用 Node.js + Express 调用本地 TeX Live 环境进行实时编译。

## ✨ 功能特性

*   **🎓 15 个精心设计的关卡**：从 "Hello World" 到复杂的 BibTeX 参考文献管理，循序渐进。
*   **🚀 实时编译预览**：左侧编写代码，右侧实时查看 PDF 效果。
*   **✅ 智能校验系统**：自动检测代码中的关键元素，判定是否通关。
*   **💾 进度自动保存**：利用浏览器缓存记录闯关进度，随时继续学习。
*   **🛠️ 完整工具链支持**：后端支持 `XeLaTeX -> BibTeX` 完整编译流程，完美处理交叉引用和目录。

## ⚙️ 环境要求 (Prerequisites)

在运行本项目之前，请确保您的电脑已安装以下软件：

1.  **Node.js** (v16 或更高版本)
    *   下载地址: [https://nodejs.org/](https://nodejs.org/)
2.  **TeX Live 发行版** (必须安装，因为后端需要调用 `xelatex` 和 `bibtex` 命令)
    *   **Windows**: 推荐安装 [TeX Live](https://tug.org/texlive/windows.html) 或 [MiKTeX](https://miktex.org/)。
        *   *国内下载加速 (清华源)*: [TeX Live 镜像下载](https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/Images/)
    *   **macOS**: 推荐安装 [MacTeX](https://tug.org/mactex/)。
    *   *验证方法*: 在终端输入 `xelatex --version`，如果有输出版本信息则表示安装成功。

## 🚀 快速开始 (Installation & Usage)

### 1. 克隆项目
打开终端 (Terminal/PowerShell)，运行以下命令：

```bash
git clone https://github.com/nicehzj/latex-learning-tool.git
cd latex-learning-tool
```

### 2. 安装依赖
**方式一：自动安装脚本 (推荐)**

*   **Windows**: 双击运行根目录下的 `install.bat`。
*   **macOS / Linux**: 在终端运行 `sh install.sh`。

**方式二：手动安装 (通用)**
在项目根目录下运行以下命令（适用于 Windows / macOS / Linux）：

```bash
npm install
```
*(这将自动识别您的操作系统并安装前端和后端的所有依赖)*

### 3. 启动项目
运行一键启动命令：

```bash
npm start
```

该命令会同时启动前后端服务。
*   **注意**: 前端服务地址通常为 `http://localhost:3000` 或 `http://localhost:5173`，**具体请以终端输出的 Local 地址为准**。

### 4. 开始学习
浏览器打开终端显示的 Local 地址（例如 `http://localhost:3000`），点击“开始第一关”即可开启您的 LaTeX 学习之旅！

## 📂 项目结构

```
latex_learning_tool/
├── packages/
│   ├── client/      # 前端 React 应用
│   └── server/      # 后端 Express 应用
├── docs/            # 项目文档
├── install.bat      # Windows 一键安装脚本
├── install.sh       # macOS/Linux 一键安装脚本
└── package.json     # 根目录配置 (Workspaces)
```

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request 来改进关卡设计或添加新功能！

## 📄 开源协议

MIT License
