import { ConfigProvider, theme } from 'antd';
import AxisConfig from './components/AxisConfig';
import SpeedConfig from './components/SpeedConfig';
import TopNav from './components/TopNav';
import 'antd/dist/reset.css';
import { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('axis');

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
        {currentView === 'axis' ? (
          <AxisConfig />
        ) : (
          <SpeedConfig />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App; 