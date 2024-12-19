import { ConfigProvider, theme } from 'antd';
import AxisConfig from './components/AxisConfig';
import 'antd/dist/reset.css';

function App() {
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
      <AxisConfig />
    </ConfigProvider>
  );
}

export default App; 