import React, { useState } from 'react';
import { Card, Table, Checkbox, Button, Space, Slider, InputNumber, Tooltip, Switch } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './AxisConfig.css';
import TestParams from '../TestParams/TestParams';

const AxisConfig = () => {
  const [selectedAxisIndex, setSelectedAxisIndex] = useState(0);
  const [speed, setSpeed] = useState(5000);

  const columns = [
    { title: '轴名称', dataIndex: 'name', width: 120 },
    { title: '序号', dataIndex: 'index', width: 80 },
    {
      title: '轴状态',
      dataIndex: 'status',
      className: 'status-column',
      render: () => (
        <div className="status-group">
          <div className="status-item"><div className="status-label">使能</div><Switch /></div>
          <div className="status-item"><div className="status-label">运动</div><div className="status-dot moving" /></div>
          <div className="status-item"><div className="status-label">报警</div><div className="status-dot alarm" /></div>
          <div className="status-item"><div className="status-label">正限位</div><div className="status-dot" /></div>
          <div className="status-item"><div className="status-label">负限位</div><div className="status-dot" /></div>
          <div className="status-item"><div className="status-label">零位</div><div className="status-dot" /></div>
        </div>
      )
    }
  ];

  const axisData = [
    { key: 0, name: '取料左右X', index: 0 },
    { key: 1, name: '取料前后Y', index: 1 },
    { key: 2, name: '取料旋转T', index: 2 },
  ];

  const getRowClassName = (record) => record.key === selectedAxisIndex ? 'selected' : '';

  const onRowClick = (record) => {
    setSelectedAxisIndex(record.key);
    const rowElement = document.querySelector(`.ant-table-row.selected`);
    if (rowElement) {
      rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="axis-config">
      <Card bordered={false}>
        <div className="axis-content">
          <div className="table-header">
            <Table
              columns={columns}
              dataSource={axisData}
              size="small"
              pagination={false}
              bordered
              rowClassName={getRowClassName}
              onRow={(record) => ({
                onClick: () => onRowClick(record),
              })}
              scroll={{ y: 300 }}
            />
            <div className="table-actions">
              <Button type="text" icon={<PlusOutlined />} />
              <Button type="text" icon={<MinusOutlined />} />
            </div>
          </div>

          <div className="motion-test">运动测试</div>

          <div className="control-buttons">
            <Space>
              <Button>连续+</Button>
              <Button>相对定长+</Button>
              <Button>绝对定长+</Button>
              <Button>往复运动</Button>
              <Button>规划位置清零</Button>
            </Space>
            <Space>
              <Button>连续-</Button>
              <Button>相对定长-</Button>
              <Button>绝对定长-</Button>
              <Button>回零</Button>
              <Button>实际位置清零</Button>
            </Space>
            <button className="emergency-stop">急停</button>
          </div>

          <div className="bottom-section">
            <div className="camera-view">
              <img src="camera-feed-url" alt="Camera View" />
            </div>
            <TestParams />
          </div>

          <div className="status-bar">
            <div className="status-bar-item">
              <span className="status-bar-label">实时位置:</span>
              <span className="status-bar-value">0.000</span>
              <span className="status-bar-unit">mm</span>
            </div>
            <div className="status-bar-item">
              <span className="status-bar-label">实时速度:</span>
              <span className="status-bar-value">0.000</span>
              <span className="status-bar-unit">mm/s</span>
            </div>
            <div className="status-bar-item">
              <span className="status-bar-label">目标位置:</span>
              <span className="status-bar-value">0.000</span>
              <span className="status-bar-unit">mm</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AxisConfig; 