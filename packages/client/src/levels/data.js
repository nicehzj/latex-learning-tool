const BS = '\\';

export const levels = [
  {
    id: 1,
    title: "1. Writing your first piece of LaTeX",
    content: `
LaTeX 文件的基本结构非常简单。所有的内容都必须包裹在 ${BS}begin{document} 和 ${BS}end{document} 之间。

**任务：** 尝试在 document 环境中输入 \"Hello, LaTeX!\"。
`,
    defaultCode: `
${BS}documentclass{article}
${BS}begin{document}
Hello, LaTeX!
${BS}end{document}
`,
    check: (code) => code.includes('Hello, LaTeX!')
  },
  {
    id: 2,
    title: "2. The preamble of a document",
    content: `
${BS}documentclass 之后、${BS}begin{document} 之前的部分被称为 **Preamble (导言区)**。在这里你可以设置宏包、定义全局样式等。

**任务：** 确认你的代码包含 ${BS}documentclass{article}。
`,
    defaultCode: `
${BS}documentclass{article}
% 这里是导言区
${BS}begin{document}
在导言区之后书写内容。
${BS}end{document}
`,
    check: (code) => code.includes(`${BS}documentclass{article}`)
  },
  {
    id: 3,
    title: "3. Including title, author and date",
    content: `
你可以使用 ${BS}title{...}, ${BS}author{...} 和 ${BS}date{...} 来定义文档信息。
然后使用 ${BS}maketitle 命令在文档中生成标题。

**任务：** 
1. 在导言区添加 ${BS}title{My First LaTeX}。
2. 在 document 环境中使用 ${BS}maketitle。
`,
    defaultCode: `
${BS}documentclass{article}
${BS}title{My First LaTeX}
${BS}author{Gemini}
${BS}date{
${BS}today
}
${BS}begin{document}
${BS}maketitle
${BS}end{document}
`,
    check: (code) => code.includes(`${BS}maketitle`) && code.includes(`${BS}title`)
  },
  {
    id: 4,
    title: "4. Adding comments",
    content: `
在 LaTeX 中，百分号 (%) 用于注释。% 之后的内容在编译时会被忽略。

**任务：** 添加一行以 % 开头的注释。
`,
    defaultCode: `
${BS}documentclass{article}
${BS}begin{document}
% 这是一个注释
Hello!
${BS}end{document}
`,
    check: (code) => /%.+/.test(code)
  },
  {
    id: 5,
    title: "5. Bold, italics and underlining",
    content: `
- 加粗：${BS}textbf{text}
- 斜体：${BS}textit{text}
- 下划线：${BS}underline{text}

**任务：** 使用 ${BS}textbf 使一段文字变粗。
`,
    defaultCode: `
${BS}documentclass{article}
${BS}begin{document}
这是一段 ${BS}textbf{加粗的文字}。
${BS}end{document}
`,
    check: (code) => code.includes(`${BS}textbf{`)
  },
];