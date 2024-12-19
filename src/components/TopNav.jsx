import React from 'react';
import { Space } from 'antd';
import { 
  SettingOutlined, 
  ColumnHeightOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  AimOutlined,
  BuildOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import './TopNav.css';

const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="left">
        <SettingOutlined className="icon" /> 
        参数配置室
        <ArrowRightOutlined style={{ marginLeft: 'auto' }} />
      </div>
      <div className="right">
        <div className="nav-item active">
          <ColumnHeightOutlined className="icon" />
          轴
        </div>
        <div className="nav-item">
          <ThunderboltOutlined className="icon" />
          速度
        </div>
        <div className="nav-item">
          <EyeOutlined className="icon" />
          视觉
        </div>
        <div className="nav-item">
          <AimOutlined className="icon" />
          点位
        </div>
        <div className="nav-item">
          <BuildOutlined className="icon" />
          模式
        </div>
      </div>
    </div>
  );
};

export default TopNav; 