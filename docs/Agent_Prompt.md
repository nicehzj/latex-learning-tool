# AI Agent Implementation Prompt

You are an expert Full-Stack Developer (React + Node.js).
Your task is to implement the "LaTeX Interactive Learning Tool" based on the following specifications.

## Project Context
*   **Goal**: Create a local web app for learning LaTeX interactively.
*   **Core Feature**: Users type LaTeX code on the frontend, the backend compiles it using the local system's `xelatex`, and the result is displayed in the browser.
*   **Architecture**: Monorepo with `client` (React) and `server` (Express).

## Step-by-Step Implementation Plan

### Phase 1: Project Initialization
1.  Initialize a root directory with a `package.json` setup for workspaces: `["packages/*"]`.
2.  Create `packages/server`: Initialize an Express app.
3.  Create `packages/client`: Initialize a React app (using Vite).

### Phase 2: Backend Implementation (Server)
1.  **Dependencies**: Install `express`, `cors`, `body-parser`.
2.  **Core Logic (`compiler.js`)**:
    *   Create a function `compileLatex(sourceCode)` that:
        *   Writes `sourceCode` to a temporary `.tex` file (e.g., in a `temp` folder).
        *   Executes `xelatex -interaction=nonstopmode -output-directory=temp filename.tex` using Node.js `child_process`.
        *   Returns a Promise that resolves with the PDF path if successful, or rejects with logs.
3.  **API Endpoint**:
    *   `POST /api/compile`: Accepts `{ source }`. Calls `compileLatex`. Returns `{ success: true, pdfUrl: "..." }`.
    *   Serve the `temp` folder as static assets so the frontend can access the generated PDFs.

### Phase 3: Frontend Implementation (Client)
1.  **Dependencies**: Install `@monaco-editor/react` (for the code editor).
2.  **UI Layout**:
    *   Create a 3-column layout: **Tutorial (Left) | Editor (Center) | Preview (Right)**.
3.  **Editor Integration**:
    *   Use Monaco Editor.
    *   Bind content to React state.
4.  **Integration**:
    *   Add a "Run" button.
    *   When clicked, POST the code to `/api/compile`.
    *   If success, display the PDF (using an `<iframe>` or `<embed>`).
    *   If error, show the compilation log in a modal or bottom panel.

### Phase 4: Gamification (Levels)
1.  Create a `levels.js` data file containing the curriculum defined in `docs/PRD.md`.
    *   Example structure: `{ id: 1, title: "Hello World", content: "...", defaultCode: "..." }`.
2.  Implement a "Next Level" button that loads the next configuration from `levels.js`.

## Important Constraints
*   **System**: Assume the host machine works on Windows and has `xelatex` in the system PATH.
*   **Style**: Use Tailwind CSS for quick styling.
*   **Simplicity**: Keep the code clean and minimal. No complex databases; use in-memory storage or local storage.

## Starting Command
Please start by executing **Phase 1: Project Initialization**. Create the folders and install the basic dependencies.
