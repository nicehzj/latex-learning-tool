# 技術設計文档 (TDD): LaTeX 学习平台

## 1. 系统架构
采用 **React (Vite)** + **Express (Node.js)** 的前后端分离架构。

### 1.1 目录结构
```
/
├── packages/
│   ├── client/          # 前端 React 应用
│   │   ├── src/
│   │   │   ├── components/  # Workbench, Editor, PDFViewer
│   │   │   ├── levels/      # 关卡内容配置 (Markdown + Metadata)
│   │   │   └── ...
│   │   └── ...
│   └── server/          # 后端 Express 应用
│       ├── src/
│       │   ├── compiler.js  # 调用 pdflatex/xelatex 核心逻辑
│       │   └── ...
│       ├── temp/            # 存放编译过程中的临时文件
│       └── ...
├── docs/                # 文档
└── README.md
```

## 2. API 接口设计

### 2.1 编译接口
*   **Endpoint**: `POST /api/compile`
*   **Request Body**:
    ```json
    {
      "source": "\\documentclass{article}...",
      "jobName": "user_session_id_123" 
    }
    ```
*   **Response (Success)**:
    ```json
    {
      "success": true,
      "pdfUrl": "/static/user_session_id_123.pdf",
      "logs": "This is pdfTeX, Version 3.14..."
    }
    ```
*   **Response (Error)**:
    ```json
    {
      "success": false,
      "logs": "! Undefined control sequence...",
      "errorMsg": "编译失败，请检查语法"
    }
    ```

### 2.2 静态资源服务
*   后端需开启静态文件服务，将 `temp` 目录映射为 `/static`，以便前端直接访问生成的 PDF。

## 3. 核心模块实现细节

### 3.1 编译器 (server/src/compiler.js)
*   **功能**:
    1.  接收源码字符串。
    2.  在 `temp` 目录下创建唯一的文件夹或文件名（避免并发冲突）。
    3.  写入 `.tex` 文件。
    4.  使用 `child_process.spawn` 调用 `xelatex -interaction=nonstopmode -output-directory=temp file.tex`。
        *   *注*: `nonstopmode` 防止报错时卡住。
    5.  监听 `close` 事件，返回结果。
*   **安全性**: 简单的本地应用暂不考虑复杂的沙箱，但需限制 `--shell-escape` 以防恶意命令执行。

### 3.2 关卡配置 (client/src/levels/data.js)
使用 JSON 或 JS 对象数组存储关卡元数据：
```javascript
export const levels = [
  {
    id: "L01",
    title: "Hello LaTeX",
    description: "Contents/L01.md", // 教程内容
    defaultCode: "\\documentclass{article}...", // 初始代码
    check: (code, logs) => {
       // 验证逻辑，返回 boolean
       return code.includes("\\begin{document}");
    }
  },
  // ...
]
```

## 4. 依赖管理
*   **Root**: `npm init -y` (作为 workspace 管理)
*   **Client**: `react`, `react-dom`, `@monaco-editor/react` (编辑器), `react-pdf` (可选，或直接用 iframe)
*   **Server**: `express`, `cors`, `body-parser`

## 5. 开发流程
1.  初始化项目结构。
2.  搭建后端：实现“接收源码 -> 生成 PDF”的最简闭环 (Hello World)。
3.  搭建前端：实现编辑器 UI 和 API 调用。
4.  实现关卡系统：将 `Contents.md` 的内容转化为前端配置。
5.  集成测试。

