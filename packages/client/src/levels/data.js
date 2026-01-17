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
];
