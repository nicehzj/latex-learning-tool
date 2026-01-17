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
**日期**: 2026-01-17

*   [x] **Phase 1: 项目初始化 (Project Initialization)**
    *   [x] 根目录 `package.json` Workspaces 配置
    *   [x] 后端 `packages/server` 基础依赖 (Express, Cors) 安装
    *   [x] 前端 `packages/client` 基础脚手架 (React, Vite) 搭建
    *   [x] 验证环境安装正确 (Build pass)

*   [x] **Phase 2: 后端核心实现 (Backend Implementation)**
    *   [x] 实现 `compiler.js` (调用 `xelatex`)
    *   [x] 实现 `/api/compile` 接口
    *   [x] 静态资源服务配置

*   [ ] **Phase 3: 前端核心实现 (Frontend Implementation)**
    *   [ ] 集成 Monaco Editor
    *   [ ] 编写 Workbench 界面
    *   [ ] 连接后端 API 并展示 PDF

*   [ ] **Phase 4: 关卡内容填充 (Content Population)**
    *   [ ] 将 12 个关卡配置化
    *   [ ] 实现闯关判定逻辑

## 3. 常用命令 (Commands)
*   **启动所有**: `npm start` (需配置)
*   **启动后端**: `cd packages/server && npm run dev`
*   **启动前端**: `cd packages/client && npm run dev`
*   **构建前端**: `npm run build -w packages/client`

## 4. 下一步计划 (Next Step)
开始 **Phase 3**，前端核心实现：集成 Monaco Editor，搭建 Workbench 界面，并连接后端 API 展示编译结果。
