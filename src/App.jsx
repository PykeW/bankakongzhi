import { ConfigProvider, theme } from 'antd';
import AxisConfig from './components/AxisConfig/AxisConfig';
import SpeedConfig from './components/SpeedConfig/SpeedConfig';
import VisionConfig from './components/VisionConfig/VisionConfig';
import TopNav from './components/TopNav/TopNav';
import BottomControls from './components/BottomControls/BottomControls';
import 'antd/dist/reset.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('axis');
  const [contentOverflow, setContentOverflow] = useState('hidden');
  const contentRef = useRef(null);

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
            marginBottom: '60px',
            overflow: 'hidden'
          }}
        >
          <div style={{ overflowY: contentOverflow, height: '100%' }}>
            {currentView === 'axis' && <AxisConfig />}
            {currentView === 'speed' && <SpeedConfig />}
            {currentView === 'vision' && <VisionConfig />}
          </div>
        </div>
        <BottomControls />
      </div>
    </ConfigProvider>
  );
}

export default App; 