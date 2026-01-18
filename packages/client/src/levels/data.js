const BS = String.fromCharCode(92);
const BT = String.fromCharCode(96); // Backtick `

export const levels = [
  {
    id: 1,
    title: "1. 编写你的第一段 LaTeX",
    content: `
第一步是创建一个新的 LaTeX 项目。让我们从最简单的可运行示例开始。

LaTeX 会自动为你处理格式，例如第一行的缩进。让我们仔细看看代码的每个部分：

1.  **第一行** ${BT}${BS}documentclass{...}${BT} 声明了文档类型（称为 **class**）。它控制文档的整体外观。
2.  设定文档类后，我们的内容（称为文档的 **body**）写在 ${BT}${BS}begin{document}${BT} 和 ${BT}${BS}end{document}${BT} 标签之间。

**任务：** 
尝试在 ${BT}document${BT} 环境中输入 "Hello, LaTeX!"。点击“运行并校验”查看生成的 PDF。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  % TODO: Type your text here
${BS}end{document}`,
    check: (code) => /Hello.*LaTeX/i.test(code)
  },
  {
    id: 2,
    title: "2. 导言区 (Preamble) 与中文支持",
    content: `
${BT}${BS}documentclass${BT} 之后、${BT}${BS}begin{document}${BT} 之前的部分被称为 **Preamble (导言区)**。

导言区就像是文档的“设置”部分。在这里，你可以：
*   定义文档类（如 ${BT}article${BT}, ${BT}book${BT}, ${BT}report${BT}）。
*   加载宏包 (**Packages**) 来扩展 LaTeX 的功能。
*   进行其他全局配置。

**中文支持知识点：**
标准的 ${BT}article${BT} 类默认**不支持中文**。如果你想在文档中正确显示中文，通常需要将文档类型设置为 ${BT}ctexart${BT} (Chinese TeX Article)。但在本教程的基础练习中，我们暂时使用通用的 ${BT}article${BT} 类。

**任务：** 
在第一行使用 ${BT}${BS}documentclass{article}${BT} 定义一个标准的文章文档。
`,
    defaultCode: `% TODO: Define document class as article

% 这里是导言区
${BS}begin{document}
  Content goes here.
${BS}end{document}`,
    check: (code) => code.includes(BS + 'documentclass{article}')
  },
  {
    id: 3,
    title: "3. 添加标题、作者和日期",
    content: `
为文档添加标题信息需要两个步骤：

1.  **在导言区声明信息**（在 ${BT}${BS}begin{document}${BT} 之前）：
    *   ${BT}${BS}title{...}${BT}: 文档标题
    *   ${BT}${BS}author{...}${BT}: 作者姓名
    *   ${BT}${BS}date{...}${BT}: 日期（如果省略，LaTeX 会自动生成当前日期。如果你**不想**显示日期，可以手动输入 ${BT}${BS}date{}${BT}）

2.  **在正文区生成标题**（在 ${BT}${BS}begin{document}${BT} 之后）：
    *   使用 ${BT}${BS}maketitle${BT} 命令将上述信息排版出来。

**任务：** 
1. 在导言区设置标题为 "My First LaTeX"。
2. 在正文中生成该标题。
`,
    defaultCode: `${BS}documentclass{article}
% TODO: Add title, author, and date here

${BS}begin{document}
  % TODO: Generate the title here

  Document content.
${BS}end{document}`,
    check: (code) => code.includes(BS + 'maketitle') && code.includes(BS + 'title')
  },
  {
    id: 4,
    title: "4. 添加注释",
    content: `
LaTeX 是一种专注于排版的编程语言。像其他代码一样，在文档中包含注释是非常有用的。

**注释 (Comments)** 是以 ${BT}%${BT} 符号开头的文本。
*   LaTeX 编译器会完全忽略 ${BT}%${BT} 之后的内容。
*   它们不会出现在生成的 PDF 中。
*   通常用于添加“待办事项”、解释复杂代码或在调试时暂时屏蔽某行代码。

**任务：** 
在代码中添加一行以 ${BT}%${BT} 开头的注释。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  Hello!
  % TODO: Add a comment below

${BS}end{document}`,
    check: (code) => /%.+/.test(code)
  },
  {
    id: 5,
    title: "5. 文本格式：粗体、斜体和下划线",
    content: `
接下来我们将学习基础的文本格式化命令，并通过组合使用它们来排版。

*   **粗体 (Bold)**: 使用 ${BT}${BS}textbf{...}${BT}。
*   *斜体 (Italics)*: 使用 ${BT}${BS}textit{...}${BT}。
*   下划线 (Underline): 使用 ${BT}${BS}underline{...}${BT}。
*   强调 (Emphasize): 使用 ${BT}${BS}emph{...}${BT}。

**任务：** 
将下面这段话进行排版：
"Some of the greatest discoveries in science were made by accident."

要求：
1. "Some" 使用强调 (**emph**)。
2. "greatest" 使用粗体 (**textbf**)。
3. "science" 使用下划线 (**underline**)。
4. "accident" 同时使用粗体和斜体 (**textbf** 和 **textit**)。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  Some of the greatest discoveries in science were made by accident.
${BS}end{document}`,
    check: (code) => {
      return code.includes(BS + 'textbf') && 
             code.includes(BS + 'textit') && 
             code.includes(BS + 'underline') && 
             code.includes(BS + 'emph');
    }
  },
  {
    id: 6,
    title: "6. 插入图片",
    content: `
在 LaTeX 中插入图片需要使用 ${BT}graphicx${BT} 宏包。

1.  **引入宏包**：在导言区（${BT}${BS}documentclass${BT} 之后）添加 ${BT}${BS}usepackage{graphicx}${BT}。
2.  **插入图片**：在正文中使用 ${BT}${BS}includegraphics{filename}${BT}。

通常我们还会指定图片大小，例如：${BT}${BS}includegraphics[width=0.5${BS}textwidth]{filename}${BT}（即页面宽度的 50%）。

**任务：**
1. 引入 ${BT}graphicx${BT} 宏包。
2. 插入一张名为 "example-image" 的图片（这是 LaTeX 内置的示例图片）。
`,
    defaultCode: `${BS}documentclass{article}
% TODO: Include graphicx package

${BS}begin{document}
  Here is an image:
  % TODO: Include 'example-image'
  
${BS}end{document}`,
    check: (code) => code.includes('usepackage{graphicx}') && code.includes('includegraphics')
  },
  {
    id: 7,
    title: "7. 图片标题、标签与引用",
    content: `
为了让图片更专业，我们通常将其放在浮动体环境 ${BT}figure${BT} 中，并添加标题和引用标签。

${BS}begin{figure}[h]
    ${BS}centering
    ${BS}includegraphics[width=0.5${BS}textwidth]{example-image}
    ${BS}caption{这是一个示例图片}
    ${BS}label{fig:myimage}
${BS}end{figure}

*   ${BT}${BS}centering${BT}: 让图片居中。
*   ${BT}${BS}caption{...}${BT}: 生成 "Figure 1: ... " 标题。
*   ${BT}${BS}label{...}${BT}: 设置一个内部标签用于引用。
*   在文中引用时使用 ${BT}${BS}ref{fig:myimage}${BT}。

**任务：**
创建一个包含标题和标签的 figure 环境，并在文中引用它。
`,
    defaultCode: `${BS}documentclass{article}
${BS}usepackage{graphicx}

${BS}begin{document}
  As seen in Figure ${BS}ref{fig:example} ...

  % TODO: Create a figure environment with caption and label
  
${BS}end{document}`,
    check: (code) => code.includes('begin{figure}') && code.includes('caption') && code.includes('label')
  },
  {
    id: 8,
    title: "8. 创建列表",
    content: `
LaTeX 提供了两种常用的列表环境：

1.  **无序列表 (Unordered List)**: 使用 ${BT}itemize${BT} 环境。
2.  **有序列表 (Ordered List)**: 使用 ${BT}enumerate${BT} 环境。

列表中的每一项都用 ${BT}${BS}item${BT} 开头。

**任务：**
创建一个 ${BT}itemize${BT} 列表和一个 ${BT}enumerate${BT} 列表，每种至少包含两个列表项。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  Unordered list: 
  % TODO: Create itemize list

  Ordered list:
  % TODO: Create enumerate list

${BS}end{document}`,
    check: (code) => code.includes('begin{itemize}') && code.includes('begin{enumerate}') && (code.match(/\item/g) || []).length >= 2
  },
  {
    id: 9,
    title: "9. 数学公式",
    content: `
LaTeX 在数学排版方面非常强大。

*   **行内公式 (Inline Math)**: 使用两个美元符号包裹，如 ${BT}$E=mc^2$${BT}。
*   **行间公式 (Display Math)**: 使用 ${BT}${BS}[ ... ${BS}]${BT} 或 ${BT}equation${BT} 环境。

示例：
${BS}[
  x = ${BS}frac{-b ${BS}pm ${BS}sqrt{b^2 - 4ac}}{2a}
${BS}]

**任务：**
1. 写一个行内公式（例如爱因斯坦质能方程）。
2. 写一个复杂的行间公式（例如二次方程求根公式）。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  Inline math: % TODO

  Display math:
  % TODO
  
${BS}end{document}`,
    check: (code) => code.includes('$') && (code.includes(BS + '[') || code.includes('equation'))
  },
  {
    id: 10,
    title: "10. 文档结构",
    content: `
长文档需要清晰的结构。使用以下命令来划分章节：

*   ${BT}${BS}section{Title}${BT}: 一级标题
*   ${BT}${BS}subsection{Title}${BT}: 二级标题
*   ${BT}${BS}subsubsection{Title}${BT}: 三级标题

**任务：**
创建一个文档，至少包含一个 Section 和一个 Subsection。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  % TODO: Add section
  Some text.

  % TODO: Add subsection
  More text.
${BS}end{document}`,
    check: (code) => code.includes(BS + 'section') && code.includes(BS + 'subsection')
  },
  {
    id: 11,
    title: "11. 创建表格",
    content: `
表格使用 ${BT}tabular${BT} 环境。

${BS}begin{tabular}{|c|c|}
  ${BS}hline
  Item & Quantity ${BS}${BS}
  ${BS}hline
  Apple & 10 ${BS}${BS}
  Orange & 5 ${BS}${BS}
  ${BS}hline
${BS}end{tabular}

*   ${BT}{|c|c|}${BT}: 定义两列，居中对齐，两边有竖线。
*   ${BT}&${BT}: 分隔单元格。
*   ${BT}${BS}${BS}${BT}: 换行。
*   ${BT}${BS}hline${BT}: 横线。

**任务：**
创建一个 2x2 或更大的表格，并带有边框。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  % TODO: Create a table
  
${BS}end{document}`,
    check: (code) => code.includes('begin{tabular}') && code.includes('&') && code.includes(BS+BS)
  },
  {
    id: 12,
    title: "12. 自动生成目录",
    content: `
有了章节结构后，生成目录 (Table of Contents) 非常简单。

只需在文档开头使用 ${BT}${BS}tableofcontents${BT} 命令。

*注意：在本地编译时通常需要运行两次 LaTeX 才能生成目录。在这个在线环境中，如果目录没有立即显示，请尝试再次点击运行，或者确信只要代码正确即可通过。*

**任务：**
在文档开头添加目录，并确保文档中有几个章节。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  % TODO: Add Table of Contents here

  ${BS}section{Introduction}
  This is the introduction.

  ${BS}section{Main Part}
  This is the main part.
${BS}end{document}`,
    check: (code) => code.includes('tableofcontents') && code.includes('section')
  }
];
