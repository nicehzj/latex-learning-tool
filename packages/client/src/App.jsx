import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { levels } from './levels/data';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [code, setCode] = useState(levels[0].defaultCode);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [logs, setLogs] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState(null);
  const [passStatus, setPassStatus] = useState(null); // 'passed' | 'failed' | null

  const currentLevel = levels[currentLevelIdx];

  // Load level code when level changes
  useEffect(() => {
    setCode(currentLevel.defaultCode);
    setPassStatus(null);
    setPdfUrl(null);
    setLogs('');
  }, [currentLevelIdx]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    setError(null);
    setPassStatus(null);

    try {
      const jobName = `job_${Date.now()}`;
      const response = await axios.post(`${API_BASE_URL}/api/compile`, {
        source: code,
        jobName: jobName
      });

      const { success, pdfUrl: returnedPdfUrl, logs: compileLogs, errorMsg } = response.data;

      setLogs(compileLogs);

      if (success) {
        setPdfUrl(`${API_BASE_URL}${returnedPdfUrl}?t=${Date.now()}`);
        
        // Check if user passed the level logic
        if (currentLevel.check(code)) {
          setPassStatus('passed');
        } else {
          setPassStatus('failed');
        }
      } else {
        setError(errorMsg || 'Compilation failed');
        setPassStatus('failed');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to connect to backend server.');
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ 
        padding: '10px 20px', 
        backgroundColor: '#282c34', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h2 style={{ margin: 0 }}>LaTeX 闯关助手</h2>
          <select 
            value={currentLevelIdx} 
            onChange={(e) => setCurrentLevelIdx(parseInt(e.target.value))}
            style={{ padding: '5px', borderRadius: '4px' }}
          >
            {levels.map((lvl, index) => (
              <option key={lvl.id} value={index}>{lvl.title}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {passStatus === 'passed' && <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✅ 闯关成功！</span>}
          {passStatus === 'failed' && <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>❌ 未达标，再试一次</span>}
          <button 
            onClick={handleCompile} 
            disabled={isCompiling}
            style={{
              padding: '8px 20px',
              backgroundColor: isCompiling ? '#ccc' : '#61dafb',
              border: 'none',
              borderRadius: '4px',
              cursor: isCompiling ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              color: '#282c34'
            }}
          >
            {isCompiling ? '编译中...' : '运行并校验'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Tutorial Sidebar (Left) */}
        <div style={{ width: '300px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
          <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            <h3>{currentLevel.title}</h3>
            <ReactMarkdown>{currentLevel.content}</ReactMarkdown>
          </div>
          <div style={{ padding: '15px', borderTop: '1px solid #eee', textAlign: 'center' }}>
            <button 
              disabled={currentLevelIdx === 0}
              onClick={() => setCurrentLevelIdx(i => i - 1)}
              style={{ marginRight: '10px' }}
            >上一关</button>
            <button 
              disabled={currentLevelIdx === levels.length - 1 || passStatus !== 'passed'}
              onClick={() => setCurrentLevelIdx(i => i + 1)}
            >下一关</button>
          </div>
        </div>

        {/* Editor (Middle) */}
        <div style={{ flex: 1, borderRight: '1px solid #ddd' }}>
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
            }}
          />
        </div>

        {/* Preview & Logs (Right) */}
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
          {/* PDF View */}
          <div style={{ flex: 2, borderBottom: '1px solid #ddd', position: 'relative' }}>
            {pdfUrl ? (
              <iframe 
                src={pdfUrl} 
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="PDF Preview"
              />
            ) : (
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#666',
                textAlign: 'center',
                padding: '20px'
              }}>
                {isCompiling ? '正在生成 PDF...' : (error ? '编译出错' : '点击“运行”查看 PDF 预览')}
              </div>
            )}
          </div>

          {/* Logs View */}
          <div style={{ flex: 1, padding: '10px', overflow: 'auto', backgroundColor: '#1e1e1e', color: '#d4d4d4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: '#61dafb', fontWeight: 'bold' }}>编译日志</span>
              <button 
                onClick={() => setLogs('')}
                style={{ fontSize: '10px', background: 'none', border: '1px solid #444', color: '#aaa', cursor: 'pointer' }}
              >清空</button>
            </div>
            {error && <div style={{ color: '#ff6b6b', marginBottom: '10px' }}><strong>错误:</strong> {error}</div>}
            <pre style={{ margin: 0, fontSize: '11px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{logs}</pre>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
