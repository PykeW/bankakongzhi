import { ConfigProvider, theme } from 'antd';
import AxisConfig from './components/AxisConfig';
import SpeedConfig from './components/SpeedConfig';
import TopNav from './components/TopNav';
import 'antd/dist/reset.css';
import { useState, useRef, useEffect } from 'react';
import BottomControls from './components/BottomControls';

function App() {
  const [currentView, setCurrentView] = useState('axis');
  const [contentOverflow, setContentOverflow] = useState('hidden');
  const contentRef = useRef(null);

  // 监测内容高度并决定是否显示滚动条
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const containerHeight = contentRef.current.clientHeight;
        setContentOverflow(contentHeight > containerHeight ? 'auto' : 'hidden');
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [currentView]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1a8989',
          colorBgContainer: '#3b3b3b',
          colorBgElevated: '#4a4a4a',
          colorText: '#ffffff',
        },
      }}
    >
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <TopNav 
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <div 
          ref={contentRef}
          style={{ 
            height: 'calc(100vh - 132px)',
            marginTop: '72px',
            marginBottom: '60px'
          }}
        >
          {currentView === 'axis' ? (
            <AxisConfig />
          ) : (
            <SpeedConfig />
          )}
        </div>
        <BottomControls />
      </div>
    </ConfigProvider>
  );
}

export default App; 