# 产品需求文档 (PRD): LaTeX 交互式闯关学习平台

## 1. 项目概述
### 1.1 背景
基于 Overleaf 经典入门教程，为零基础用户打造一款**本地化、游戏化**的 LaTeX 学习应用。
### 1.2 目标
*   **交互式学习**：左侧教程任务，中间代码编辑，右侧实时 PDF 预览。
*   **本地引擎**：利用用户本地已安装的 TexLive 环境，保证编译结果的真实性和专业性。
*   **循序渐进**：将 12 个核心知识点设计为闯关关卡。

## 2. 课程与关卡设计 (Curriculum)
基于 `Contents.md` 规划如下关卡。每个关卡包含“知识点讲解”和“通关任务”。

| 关卡 ID | 关卡名称 (Level Name) | 核心知识点 | 通关任务 (Challenge) |
| :--- | :--- | :--- | :--- |
| **L01** | Hello LaTeX | 最小文档结构 `\documentclass`, `\begin{document}` | 编写并编译出你的第一份 PDF |
| **L02** | 导言区 (Preamble) | 宏包引入 `\usepackage`, 页面设置 | 引入 `geometry` 宏包并设置页边距 |
| **L03** | 封面信息 | `\title`, `\author`, `\date`, `\maketitle` | 生成包含标题和作者的文档首页 |
| **L04** | 注释的艺术 | `%` 注释符号的使用 | 在代码中添加一行不会被显示的注释 |
| **L05** | 文本格式化 | **加粗** `\textbf`, *斜体* `\textit`, 下划线 `\underline` | 将一段文字同时设置为加粗和斜体 |
| **L06** | 插入图片 | `graphicx` 宏包, `\includegraphics` | 成功插入项目提供的示例图片 |
| **L07** | 图注与引用 | `\caption`, `\label`, `\ref` | 给图片加标题并在文中引用它 |
| **L08** | 列表制作 | `itemize` (无序), `enumerate` (有序) | 创建一个嵌套列表（有序套无序） |
| **L09** | 数学公式入门 | 行内 `$`, 行间 `$$` / `\[ \]` | 排版爱因斯坦质能方程 $E=mc^2$ |
| **L10** | 文章结构 | `\section`, `\subsection`, `\paragraph` | 创建具有三级标题层级的文档 |
| **L11** | 表格制作 | `tabular` 环境, 边框 `|`, `\hline` | 创建一个 3x3 的三线表 |
| **L12** | 目录生成 | `\tableofcontents` | 自动生成目录，并验证页码正确 |

## 3. 功能需求

### 3.1 学习工作台 (Workbench)
*   **教程区 (Left)**: 显示当前 Level 的 markdown 教程。
*   **编辑器 (Center)**: Monaco Editor (React)，支持 LaTeX 语法高亮。
*   **预览区 (Right)**: 显示后端编译生成的 PDF (使用 `react-pdf` 或 iframe)。
*   **控制台 (Bottom/Overlay)**: 显示编译日志，友好展示错误信息（Error Parsing）。

### 3.2 闯关判定系统
*   **Check 1: 编译状态**: 必须成功编译无 Error。
*   **Check 2: 关键词匹配**: 正则表达式检查源码是否包含特定命令（如 `\textbf{.*}`）。
*   **Check 3: 内容检查**: (高级) 解析 PDF 文本内容确保目标文字出现。

### 3.3 后端服务 (Node.js)
*   **API**: `POST /api/compile`
    *   接收: 用户输入的 LaTeX 源码。
    *   执行: 写入临时目录 -> `exec('xelatex jobname.tex')`。
    *   返回: PDF 文件 URL 或 错误日志。

## 4. 技术栈
*   **Frontend**: React, Vite, TailwindCSS, Monaco Editor.
*   **Backend**: Node.js (Express/Koa).
*   **Environment**: 依赖本地 PATH 中的 `xelatex` 或 `pdflatex`。
