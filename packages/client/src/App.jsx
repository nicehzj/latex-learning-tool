import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { levels } from './levels/data';

const API_BASE_URL = 'http://127.0.0.1:5000';

function App() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [code, setCode] = useState(levels[0].defaultCode);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [logs, setLogs] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState(null);
  const [passStatus, setPassStatus] = useState(null); // 'passed' | 'failed' | null

  const currentLevel = levels[currentLevelIdx];

  // Load level code when level changes
  useEffect(() => {
    // Replace placeholder __BS__ with actual backslash
    const initialCode = currentLevel.defaultCode.replaceAll('__BS__', '\\');
    setCode(initialCode);
    setPassStatus(null);
    setPdfUrl(null);
    setLogs('');
    setShowLogs(false);
  }, [currentLevelIdx]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    setError(null);
    setPassStatus(null);
    setShowLogs(false);

    try {
      const jobName = `level_${currentLevel.id}_${Date.now()}`;
      const response = await axios.post(`${API_BASE_URL}/api/compile`, {
        source: code,
        jobName: jobName
      });

      const { success, pdfUrl: returnedPdfUrl, logs: compileLogs, errorMsg } = response.data;

      setLogs(compileLogs);

      if (success) {
        setPdfUrl(`${API_BASE_URL}${returnedPdfUrl}?t=${Date.now()}`);
        
        if (currentLevel.check(code)) {
          setPassStatus('passed');
        } else {
          setPassStatus('failed');
        }
      } else {
        setError(errorMsg || 'Compilation failed');
        setPassStatus('failed');
        setShowLogs(true);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to connect to backend server.');
      setShowLogs(true);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="flex items-center gap-4">
          <h1 className="brand-title">
            <span>🚀</span> LaTeX 闯关助手
          </h1>
          <select 
            className="level-select"
            value={currentLevelIdx} 
            onChange={(e) => setCurrentLevelIdx(parseInt(e.target.value))}
          >
            {levels.map((lvl, index) => (
              <option key={lvl.id} value={index}>
                Level {index + 1}: {lvl.title}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-4">
          {passStatus === 'passed' && (
            <span className="status-badge status-passed">
              <span>✅</span> 闯关成功
            </span>
          )}
          {passStatus === 'failed' && (
            <span className="status-badge status-failed">
              <span>❌</span> 未达标
            </span>
          )}
          
          <button 
            className="btn btn-primary"
            onClick={handleCompile} 
            disabled={isCompiling}
          >
            {isCompiling ? (
              <>
                <span>⏳</span> 编译中...
              </>
            ) : (
              <>
                <span>▶️</span> 运行并校验
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        
        {/* Tutorial Sidebar (Left) */}
        <div className="tutorial-pane">
          <div className="tutorial-content markdown-body">
            <h3>{currentLevel.title}</h3>
            <ReactMarkdown>{currentLevel.content}</ReactMarkdown>
          </div>
          <div className="tutorial-footer">
            <button 
              className="btn btn-outline"
              disabled={currentLevelIdx === 0}
              onClick={() => setCurrentLevelIdx(i => i - 1)}
            >
              ⬅️ 上一关
            </button>
            <button 
              className={`btn ${passStatus === 'passed' ? 'btn-primary' : 'btn-outline'}`}
              disabled={currentLevelIdx === levels.length - 1}
              onClick={() => setCurrentLevelIdx(i => i + 1)}
            >
              下一关 ➡️
            </button>
          </div>
        </div>

        {/* Editor (Middle) */}
        <div className="editor-pane">
          <div className="editor-header">
            main.tex
          </div>
          <Editor
            height="100%"
            defaultLanguage="latex"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              fontFamily: "'JetBrains Mono', Consolas, monospace",
              padding: { top: 16 }
            }}
          />
        </div>

        {/* Preview & Logs (Right) */}
        <div className="preview-pane">
          <div className="pdf-container">
            {pdfUrl ? (
              <iframe 
                src={pdfUrl} 
                className="pdf-frame"
                title="PDF Preview"
              />
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📄</div>
                <div>
                  {isCompiling ? '正在生成 PDF...' : (error ? '编译出错' : '点击“运行”查看 PDF 预览')}
                </div>
              </div>
            )}
          </div>

          {/* Logs View (Conditional) */}
          {showLogs && (
            <div className="logs-panel">
              <div className="logs-header">
                <span style={{ color: '#ef4444' }}>⚠️ 编译错误 / 日志</span>
                <button 
                  className="close-logs-btn"
                  onClick={() => setShowLogs(false)}
                >
                  ✕
                </button>
              </div>
              <div className="logs-content">
                {error && <div style={{ color: '#ef4444', marginBottom: '8px' }}><strong>Error:</strong> {error}</div>}
                {logs}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;