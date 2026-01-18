import React from 'react';
import { Link } from 'react-router-dom';
import { levels } from '../levels/data';

function Home() {
  const maxLevel = parseInt(localStorage.getItem('latex_max_level') || '1');
  const isReturningUser = maxLevel > 1;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      fontFamily: "'Inter', sans-serif",
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Hero Section */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', marginBottom: '20px' }}>
        <button
          onClick={() => {
            if (window.confirm('确定要清除所有进度并重新开始吗？')) {
              localStorage.removeItem('latex_max_level');
              window.location.reload();
            }
          }}
          style={{
            background: 'transparent',
            border: '1px solid #cbd5e1',
            color: '#64748b',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#ef4444';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          我是新用户 (清除进度)
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '900px' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '800', 
          marginBottom: '20px',
          background: 'linear-gradient(to right, #3b82f6, #2563eb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          LaTeX 交互式闯关学习助手
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: '1.6', whiteSpace: 'nowrap' }}>
          零基础入门 LaTeX 排版，通过 15 个精心设计的交互式关卡，在实战中掌握学术写作的核心技能。
        </p>
        <div style={{ marginTop: '30px' }}>
          <Link to={`/level/${maxLevel}`} style={{
            display: 'inline-block',
            padding: '12px 32px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '1.1rem',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)',
            transition: 'transform 0.2s'
          }}>
            {isReturningUser ? `继续第 ${maxLevel} 关 ▶` : '开始第一关 🚀'}
          </Link>
        </div>
      </div>

      {/* Grid Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px', 
        width: '100%', 
        maxWidth: '1200px' 
      }}>
        {levels.map((level, index) => {
          const isCompleted = (index + 1) < maxLevel;
          const isCurrent = (index + 1) === maxLevel;
          
          return (
          <Link 
            key={level.id} 
            to={`/level/${level.id}`}
            style={{ 
              textDecoration: 'none', 
              color: 'inherit',
              cursor: 'pointer'
            }}
          >
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              height: '100%',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: `1px solid ${isCurrent ? '#3b82f6' : '#e2e8f0'}`,
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = isCurrent ? '#3b82f6' : '#e2e8f0';
            }}
            >
              {/* Status Icon */}
              <div style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '20px',
                fontSize: '1.2rem'
              }}>
                {isCompleted && <span title="已完成">✅</span>}
                {isCurrent && <span title="进行中" style={{ fontSize: '0.8rem' }}>🔵</span>}
              </div>

              <div style={{ 
                fontSize: '0.9rem', 
                color: isCompleted ? '#166534' : (isCurrent ? '#3b82f6' : '#64748b'), 
                fontWeight: '600', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Level {index + 1}
              </div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                margin: '0 0 10px 0', 
                fontWeight: '700' 
              }}>
                {level.title.replace(/^\d+\.\s*/, '')}
              </h3>
              <div style={{ 
                marginTop: 'auto', 
                fontSize: '0.95rem',
                color: '#64748b'
              }}>
                {isCompleted ? '温习本关' : '点击开始挑战 →'}
              </div>
            </div>
          </Link>
        )})}
      </div>
    </div>
  );
}

export default Home;