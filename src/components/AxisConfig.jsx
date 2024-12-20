import React, { useState } from 'react';
import { Card, Table, InputNumber, Checkbox, Button, Space } from 'antd';
import { SaveOutlined, UndoOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './AxisConfig.css';
import TestParams from './TestParams';

const AxisConfig = () => {
  const [selectedAxisIndex, setSelectedAxisIndex] = useState(0);

  // 轴状态表格列定义
  const columns = [
    { 
      title: '轴名称', 
      dataIndex: 'name',
      width: 120,
    },
    { 
      title: '序号', 
      dataIndex: 'index',
      width: 80,
    },
    {
      title: '轴状态',
      dataIndex: 'status',
      className: 'status-column',
      render: () => (
        <div className="status-group">
          <div className="status-item">
            <div className="status-label">使能</div>
            <Checkbox />
          </div>
          <div className="status-item">
            <div className="status-label">运动</div>
            <div className="status-dot moving" />
          </div>
          <div className="status-item">
            <div className="status-label">报警</div>
            <div className="status-dot alarm" />
          </div>
          <div className="status-item">
            <div className="status-label">正限位</div>
            <div className="status-dot" />
          </div>
          <div className="status-item">
            <div className="status-label">负限位</div>
            <div className="status-dot" />
          </div>
          <div className="status-item">
            <div className="status-label">零位</div>
            <div className="status-dot" />
          </div>
        </div>
      )
    }
  ];

  // 轴数据
  const axisData = [
    { key: 0, name: '取料左右X', index: 0 },
    { key: 1, name: '取料前后Y', index: 1 },
    { key: 2, name: '取料旋转T', index: 2 },
  ];

  // 表格行类名处理
  const getRowClassName = (record) => {
    return record.key === selectedAxisIndex ? 'selected' : '';
  };

  // 行点击处理
  const onRowClick = (record) => {
    setSelectedAxisIndex(record.key);
  };

  return (
    <div className="axis-config">
      <Card bordered={false}>
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

        <TestParams />

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
      </Card>
    </div>
  );
};

export default AxisConfig; 