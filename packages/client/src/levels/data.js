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
    check: (code) => {
      const getComments = (src) => (src.match(/%.*/g) || []).map(c => c.trim());
      const defaultComments = getComments(levels.find(l => l.id === 4).defaultCode);
      const userComments = getComments(code);
      
      // Pass if user has more comments OR a comment that isn't in the default set
      // (Simple check: is there any comment in userComments not present in defaultComments?)
      // However, if they just duplicated the default line, that's technically a new comment line but same content.
      // Let's just check if the COUNT of comments is greater than default count.
      // Default code has exactly 1 comment: "% TODO: Add a comment below"
      return userComments.length > defaultComments.length;
    }
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

${BT}${BT}${BT}latex
${BS}begin{figure}[h]
  ${BS}centering
  ${BS}includegraphics[width=0.5${BS}textwidth]{example-image}
  ${BS}caption{这是一个示例图片}
  ${BS}label{fig:myimage}
${BS}end{figure}
${BT}${BT}${BT}

*   ${BT}${BS}centering${BT}: 让图片居中。
*   ${BT}${BS}caption{...}${BT}: 生成 "Figure 1: ... " 标题。
*   ${BT}${BS}label{...}${BT}: 设置一个内部标签用于引用。
*   在文中引用时使用 ${BT}${BS}ref{...}${BT}，其中的参数必须与 ${BT}${BS}label${BT} 中的内容完全一致。

**任务：**
1. 创建一个 ${BT}figure${BT} 环境。
2. 为图片设置标题（caption）为 "A sample image"。
3. 为图片设置标签（label）为 "fig:example"。
4. 在正文中使用 ${BT}${BS}ref{fig:example}${BT} 进行引用（编辑器中已提供部分代码）。
`,
    defaultCode: `${BS}documentclass{article}
${BS}usepackage{graphicx}

${BS}begin{document}
  As seen in Figure ${BS}ref{fig:example} ...

  % TODO: Create a figure environment with caption and label
  
${BS}end{document}`,
    check: (code) => code.includes('begin{figure}') && code.includes('caption{A sample image}') && code.includes('label{fig:example}') && code.includes('ref{fig:example}')
  },
  {
    id: 8,
    title: "8. 创建列表 (Lists)",
    content: `
LaTeX 提供了两种常用的列表环境：**无序列表**和**有序列表**。

### 1. 无序列表 (Unordered List)
使用 ${BT}itemize${BT} 环境，列表项默认以圆点标记。

${BT}${BT}${BT}latex
${BS}begin{itemize}
  ${BS}item 苹果
  ${BS}item 香蕉
  ${BS}item[+] 樱桃 (手动指定符号)
${BS}end{itemize}
${BT}${BT}${BT}

### 2. 有序列表 (Ordered List)
使用 ${BT}enumerate${BT} 环境，列表项自动编号 (1, 2, 3...)。

${BT}${BT}${BT}latex
${BS}begin{enumerate}
  ${BS}item 第一步：准备食材
  ${BS}item 第二步：开始烹饪
${BS}end{enumerate}
${BT}${BT}${BT}

### 3. 多级列表 (Nested Lists)
你可以在一个列表项中嵌套另一个列表。LaTeX 会自动调整内层的符号或编号样式。

${BT}${BT}${BT}latex
${BS}begin{enumerate}
  ${BS}item 动物
    ${BS}begin{itemize}
      ${BS}item 狗
      ${BS}item 猫
    ${BS}end{itemize}
  ${BS}item 植物
${BS}end{enumerate}
${BT}${BT}${BT}

### 4. 自定义序号 (进阶)
要改变有序列表的样式（如 A, B, C 或 i, ii, iii），推荐在导言区引入 ${BT}${BS}usepackage{enumitem}${BT} 宏包，然后使用参数配置：

*   ${BT}${BS}begin{enumerate}[label=${BS}Alph*.]${BT} → A., B., ...
*   ${BT}${BS}begin{enumerate}[label=${BS}roman*)]${BT} → i), ii), ...

**任务：**
1. 在 "Shopping List" 部分创建一个 ${BT}itemize${BT} 列表，包含三项：**Apples**, **Milk**, **Bread**。
2. 在 "Instructions" 部分创建一个 ${BT}enumerate${BT} 列表，包含两步：**Preheat the oven**, **Bake for 20 minutes**。
3. (可选) 尝试引入 ${BT}enumitem${BT} 宏包并自定义编号样式。
`,
    defaultCode: `${BS}documentclass{article}
% TODO: (Optional) Include enumitem package

${BS}begin{document}
  ${BS}section*{Shopping List (Unordered)}
  % TODO: Create itemize list

  ${BS}section*{Instructions (Ordered)}
  % TODO: Create enumerate list

${BS}end{document}`,
    check: (code) => {
      const hasItemize = code.includes('begin{itemize}');
      const hasEnumerate = code.includes('begin{enumerate}');
      const hasItems = ['Apples', 'Milk', 'Bread', 'Preheat', 'Bake'].every(item => code.includes(item));
      return hasItemize && hasEnumerate && hasItems;
    }
  },
  {
    id: 9,
    title: "9. 数学公式",
    content: `
LaTeX 在数学排版方面非常强大。

### 1. 公式环境
*   **行内公式 (Inline)**: 用 ${BT}$...$${BT} 包裹。
*   **行间公式 (Display)**: 用 ${BT}${BS}[ ... ${BS}]${BT} 或 ${BT}equation${BT} 环境。

### 2. 常用符号与语法
*   **上下标**: 上标用 ${BT}^${BT}，下标用 ${BT}_${BT}。若内容多于一个字符，需用 ${BT}{}${BT} 包裹。
*   **希腊字母**: 使用英文名称前加反斜杠，如 α (alpha), β (beta), π (pi), Γ (Gamma)。
*   **常用运算**:
    *   分式: ${BT}${BS}frac分子}{分母}${BT}
    *   根号: ${BT}${BS}sqrt{x}${BT}
    *   正负号: ${BT}${BS}pm${BT}

**任务：**
1. 在正文中写一个行内公式，目标效果如下：
   > **α + β = Γ**

2. 使用 ${BT}equation${BT} 环境编写二次方程求根公式，目标效果如下：
   
   ![Quadratic Formula](https://latex.codecogs.com/svg.latex?%5Ccolor%7BGray%7Dx%20%3D%20%5Cfrac%7B-b%20%5Cpm%20%5Csqrt%7Bb%5E2%20-%204ac%7D%7D%7B2a%7D)

   *(提示：你需要组合使用分式、正负号、根号和上标)*
`,
    defaultCode: `${BS}documentclass{article}
${BS}usepackage{amsmath}

${BS}begin{document}
  % TODO: 1. 在此处编写行内公式
  

  % TODO: 2. 在此处使用 equation 环境编写求根公式
  ${BS}begin{equation}
    
  ${BS}end{equation}
  
${BS}end{document}`,
    check: (code) => {
      const hasInline = code.includes('alpha') && code.includes('beta') && code.includes('Gamma');
      const hasEquation = code.includes('begin{equation}');
      const hasQuadratic = code.includes('frac') && code.includes('sqrt') && code.includes('4ac') && code.includes('pm');
      return hasInline && hasEquation && hasQuadratic;
    }
  },
  {
    id: 10,
    title: "10. 文档结构 (Document Structure)",
    content: `
长文档需要清晰的结构。使用以下命令来划分章节，LaTeX 会自动为你处理编号和字体大小：

*   ${BT}${BS}section{...}${BT}: 一级标题（节）
*   ${BT}${BS}subsection{...}${BT}: 二级标题（小节）
*   ${BT}${BS}subsubsection{...}${BT}: 三级标题（小小节）

**任务：**
请按照以下结构组织你的文档：
1. 创建一个名为 **Introduction to LaTeX** 的一级标题 (${BT}section${BT})。
2. 在该标题下，创建一个名为 **Basic Commands** 的二级标题 (${BT}subsection${BT})。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  % TODO: 在此处添加一级标题和二级标题
  
${BS}end{document}`,
    check: (code) => {
      const hasSection = code.includes('section{Introduction to LaTeX}');
      const hasSubsection = code.includes('subsection{Basic Commands}');
      return hasSection && hasSubsection;
    }
  },
  {
    id: 11,
    title: "11. 创建表格",
    content: `
表格使用 ${BT}tabular${BT} 环境。要创建一个漂亮的表格，你需要定义列对齐方式和边框。

### 示例代码
${BT}${BT}${BT}latex
${BS}begin{table}[h]
  ${BS}centering
  ${BS}begin{tabular}{|c|c|}
    ${BS}hline
    Name & Score ${BS}${BS}
    ${BS}hline
    Alice & 95 ${BS}${BS}
    Bob & 88 ${BS}${BS}
    ${BS}hline
  ${BS}end{tabular}
  ${BS}caption{Student Scores}
  ${BS}label{tab:scores}
${BS}end{table}
${BT}${BT}${BT}

### 语法详解
*   **浮动体环境**: 使用 ${BT}table${BT} 环境包裹 ${BT}tabular${BT}，使其成为可浮动的对象。
*   **标题与标签**: 与图片类似，使用 ${BT}${BS}caption{...}${BT} 添加标题，${BT}${BS}label{...}${BT} 添加引用标签。
*   **表格内容 (${BT}tabular${BT})**:
    *   ${BT}{|l|c|r|}${BT}: 定义三列（左、中、右对齐）及竖线边框。
    *   ${BT}&${BT}: 分隔单元格。
    *   ${BT}${BS}${BS}${BT}: 换行。
    *   ${BT}${BS}hline${BT}: 插入横线。

**任务：**
1. 创建一个包含标题 "Grocery List" 和标签 "tab:grocery" 的表格环境。
2. 在其中复现下图所示的表格内容：

![Table Target](https://latex.codecogs.com/png.latex?%5Cbegin%7Btabular%7D%7B%7Cl%7Cc%7Cr%7C%7D%20%5Chline%20Item%20%26%20Qty%20%26%20Price%20%5C%5C%20%5Chline%20Item%20A%20%26%202%20%26%20%5C%2410%20%5C%5C%20Item%20B%20%26%201%20%26%20%5C%245%20%5C%5C%20%5Chline%20%5Cend%7Btabular%7D)

*(提示：表格有三列，对齐方式分别为 左对齐、居中、右对齐。别忘了美元符号 $ 需要转义，写作 ${BT}${BS}$${BT})*
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  As shown in Table ${BS}ref{tab:grocery}...

  % TODO: Create a table environment with caption, label, and tabular content
  ${BS}begin{table}[h]
    ${BS}centering
    % TODO: Add tabular here
    
    % TODO: Add caption and label
    
  ${BS}end{table}
${BS}end{document}`,
    check: (code) => {
      const hasTableEnv = code.includes('begin{table}');
      const hasCaption = code.includes('caption{Grocery List}');
      const hasLabel = code.includes('label{tab:grocery}');
      const hasTabular = code.includes('begin{tabular}');
      const hasData = code.includes('Item A') && code.includes('Item B') && code.includes('10');
      return hasTableEnv && hasCaption && hasLabel && hasTabular && hasData;
    }
  },
  {
    id: 12,
    title: "12. 自动生成目录",
    content: `
有了章节结构后，生成目录 (Table of Contents) 非常简单。

只需在文档开头使用 ${BT}${BS}tableofcontents${BT} 命令。

*注意：在本地编译时通常需要运行两次 LaTeX 才能生成目录。在这个在线环境中，如果你点击一次运行后目录未显示，请尝试再次点击运行。*

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
  },
  {
    id: 13,
    title: "13. 文献引用 (Citations)",
    content: `
在学术写作中，引用他人的工作是必不可少的。在 LaTeX 中，我们使用 ${BT}${BS}cite{key}${BT} 命令在文中进行标注。

### 核心概念
*   **引用键 (Citation Key)**: 每个参考文献都有一个唯一的 ID（如 ${BT}texbook89${BT}）。
*   **引用命令**: 在你需要引用的文字后面输入 ${BT}${BS}cite{引用键}${BT}，LaTeX 会自动将其渲染为编号（如 [1]）。

**任务：**
请在正文中引用键为 **latexguide** 的文献。
目标效果："... as discussed in the literature [1]"。
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  % TODO: 在正文中使用 cite 命令引用 latexguide
  LaTeX is a powerful tool for typesetting, as discussed 

  % 参考文献列表已预置在下方
  ${BS}begin{thebibliography}{9}
    ${BS}bibitem{latexguide} 
    Leslie Lamport, ${BS}textit{LaTeX: A Document Preparation System}, 1994.
  ${BS}end{thebibliography}
${BS}end{document}`,
    check: (code) => code.includes(BS + 'cite{latexguide}')
  },
  {
    id: 14,
    title: "14. 参考文献目录 (Bibliography)",
    content: `
除了在文中引用，我们还需要在文档末尾列出所有参考文献的详细信息。

### 1. thebibliography 环境
LaTeX 使用 ${BT}thebibliography${BT} 环境来生成标准的参考文献列表。
*   环境参数 **{99}** 告诉 LaTeX 预留两个数字的宽度编号（即最大支持到 [99]）。

### 2. 添加条目
每个参考文献条目都使用 ${BT}${BS}bibitem{引用键}${BT} 开头。
*   **引用键 (Key)**: 必须与文中的 ${BT}${BS}cite{...}${BT} 保持一致。
*   **条目内容**: 紧跟在命令后面，通常格式为：作者, *书名* (斜体), 出版年份.

### 示例结构
${BT}${BT}${BT}latex
${BS}begin{thebibliography}{99}
  ${BS}bibitem{引用键1} 作者A, ${BS}textit{书名A}, 2023.
  ${BS}bibitem{引用键2} 作者B, ${BS}textit{书名B}, 2024.
${BS}end{thebibliography}
${BT}${BT}${BT}

**任务：**
请在文档末尾手动创建一个参考文献目录，包含一个条目：
*   **引用键**：knuth84
*   **内容**：Donald Knuth, *The TeXbook*, 1984. (书名请使用 ${BT}${BS}textit{...}${BT} 设为斜体)
`,
    defaultCode: `${BS}documentclass{article}
${BS}begin{document}
  Donald Knuth wrote a famous book ${BS}cite{knuth84}.

  % TODO: 在此处手动创建 thebibliography 环境并添加条目 knuth84
  
${BS}end{document}`,
    check: (code) => {
      const hasEnv = code.includes('begin{thebibliography}');
      const hasItem = code.includes('bibitem{knuth84}');
      const hasContent = code.includes('Knuth') && code.includes('1984');
      return hasEnv && hasItem && hasContent;
    }
  },
  {
    id: 15,
    title: "15. 进阶：BibTeX 与 Google Scholar",
    content: `
手动编写 ${BT}${BS}bibitem${BT} 非常繁琐。在实际项目中，我们通常使用 **BibTeX** 自动化管理文献。

### 1. 参考文献样式 (Bibliography Styles)
通过 ${BT}${BS}bibliographystyle{...}${BT}，你可以一键更换整篇文档的引用格式：

*   **plain**: 最经典的样式。按作者姓氏字母排序，条目带编号 [1]。
*   **unsrt**: 与 plain 类似，但条目按**文中出现的先后顺序**排序（非常常用）。
*   **IEEEtran**: 电子工程、计算机领域标准 (IEEE 格式)，编号排序，格式严谨。
*   **abbrv**: 缩写样式，会将作者名字、月份等进行缩写。
*   **alpha**: 引用标签不再是数字，而是 [Lam94] 这种形式（作者姓前三字母+年份）。
*   **chicago / apalike**: 遵循芝加哥或 APA 规范，通常用于社会科学。

### 2. Google Scholar 工作流
1.  **查找**: 在 [Google Scholar](https://scholar.google.com) 搜索文献。
2.  **导出**: 点击 "引用 (Cite)" -> "BibTeX"，复制生成的代码。
3.  **保存**: 将代码保存为 ${BT}.bib${BT} 文件（例如 ${BT}ref.bib${BT}）。
4.  **调用**: 在正文末尾使用 ${BT}${BS}bibliographystyle{样式名}${BT} 和 ${BT}${BS}bibliography{文件名}${BT}。

**任务：**
1. 观察代码顶部的 ${BT}filecontents${BT} 模拟的 BibTeX 内容（引用键为 **einstein**）。
2. 在正文中引用它：${BT}${BS}cite{einstein}${BT}。
3. 在文档末尾设置样式为 **unsrt** (按出现顺序排序) 且数据源为 **references**。
`,
    defaultCode: `${BS}documentclass{article}
${BS}usepackage{filecontents}

% 这一段模拟了一个名为 references.bib 的文件
${BS}begin{filecontents}{references.bib}
@article{einstein,
    author = "Albert Einstein",
    title = "{Zur Elektrodynamik bewegter K{\"o}rper}. ({German})
    [{On} the electrodynamics of moving bodies]",
    journal = "Annalen der Physik",
    volume = "322",
    number = "10",
    pages = "891--921",
    year = "1905",
    DOI = "http://dx.doi.org/10.1002/andp.19053221004"
}
${BS}end{filecontents}

${BS}begin{document}
  % TODO: 1. 在这里引用 einstein
  Relativity is a famous theory 

  % TODO: 2. 设置参考文献样式 (尝试使用 unsrt, plain 或 IEEEtran)
  

  % TODO: 3. 引入参考文献数据源 references
  
${BS}end{document}`,
    check: (code) => {
      const hasCite = code.includes('cite{einstein}');
      const hasStyle = /bibliographystyle\{(unsrt|plain|IEEEtran|abbrv|alpha)\}/.test(code);
      const hasBib = code.includes('bibliography{references}');
      return hasCite && hasStyle && hasBib;
    }
  }
];