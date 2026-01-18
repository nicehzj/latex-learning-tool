# Gemini Project Context: LaTeX Learning Tool

## 1. 项目简介 (Overview)
*   **名称**: LaTeX 交互式闯关学习助手 (LaTeX Learning Tool)
*   **目标**: 为零基础用户提供“交互式教程 + 闯关游戏”的学习体验，使用本地 TexLive 环境生成真实 PDF。
*   **架构**: Monorepo (npm workspaces)
    *   **Client**: React + Vite + Monaco Editor
    *   **Server**: Node.js + Express (调用本地 `xelatex`)
*   **关键文档**:
    *   `docs/PRD.md`: 产品需求
    *   `docs/TDD.md`: 技术设计
    *   `docs/Agent_Prompt.md`: 开发指令

## 2. 当前进度 (Progress)
**日期**: 2026-01-18

*   [x] **Phase 1: 项目初始化 (Project Initialization)**
    *   [x] 根目录 `package.json` Workspaces 配置
    *   [x] 后端 `packages/server` 基础依赖 (Express, Cors) 安装
    *   [x] 前端 `packages/client` 基础脚手架 (React, Vite) 搭建
    *   [x] 验证环境安装正确 (Build pass)

*   [x] **Phase 2: 后端核心实现 (Backend Implementation)**
    *   [x] 实现 `compiler.js` (调用 `xelatex`)
    *   [x] 实现 `/api/compile` 接口
    *   [x] 静态资源服务配置
    *   [x] **高级编译**: 支持双重编译及 BibTeX 完整工具链 (xelatex -> bibtex -> xelatex)

*   [x] **Phase 3: 前端核心实现 (Frontend Implementation)**
    *   [x] 集成 Monaco Editor
    *   [x] 编写 Workbench 界面 (三栏布局：教程/编辑器/预览)
    *   [x] 连接后端 API 并展示 PDF
    *   [x] **UI/UX 升级**: 引入 Design System，优化布局、配色与交互反馈

*   [x] **Phase 4: 关卡内容填充 (Content Population)**
    *   [x] 将 12 个关卡配置化 (已完成 1-15 关，新增引用与 BibTeX 进阶)
    *   [x] 实现闯关判定逻辑
    *   [x] **教程优化**: 优化了数学公式、表格的视觉展示，采用“看图写代码”模式

*   [x] **Phase 5: 导航与持久化 (Navigation & Persistence)**
    *   [x] 引入 `react-router-dom` 实现路由管理
    *   [x] **Home 界面**: 全新设计的主页，支持关卡网格展示与状态指示 (✅/🔵/🔒)
    *   [x] **进度记忆**: 使用 `localStorage` 记录用户最高通关记录
    *   [x] **会话管理**: 优化编译 Session ID，确保目录和引用稳定生成

## 3. 常用命令 (Commands)
*   **一键启动**: `npm start` (同时启动前后端服务)
*   **启动后端**: `cd packages/server && npm run dev`
*   **启动前端**: `cd packages/client && npm run dev`
*   **构建前端**: `npm run build -w packages/client`

## 4. 下一步计划 (Next Step)
项目核心功能已全部完成！下一步可以考虑：
*   添加更多高级关卡（如 Beamer 幻灯片、绘图 TikZ）。
*   部署到线上环境（Docker化）。
*   添加用户登录系统（对接数据库）。