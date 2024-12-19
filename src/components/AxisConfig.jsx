import React from 'react';
import { Card, Table, InputNumber, Checkbox, Button, Space } from 'antd';
import { SaveOutlined, UndoOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './AxisConfig.css';
import TopNav from './TopNav';

const AxisConfig = () => {
  // 轴状态表格列定义
  const columns = [
    { 
      title: '轴名称', 
      dataIndex: 'name', 
      width: 120,
      className: 'column-name'
    },
    { 
      title: '序号', 
      dataIndex: 'index', 
      width: 80,
      className: 'column-index'
    },
    { 
      title: '轴状态',
      children: [
        { 
          title: '使能', 
          dataIndex: 'enabled', 
          render: () => <Checkbox />,
          className: 'column-status'
        },
        { 
          title: '运动', 
          dataIndex: 'moving', 
          render: () => <div className="status-dot moving" />,
          className: 'column-status'
        },
        { title: '报警', dataIndex: 'alarm', render: () => <div className="status-dot alarm" /> },
        { title: '正限位', dataIndex: 'posLimit', render: () => <div className="status-dot" /> },
        { title: '负限位', dataIndex: 'negLimit', render: () => <div className="status-dot" /> },
        { title: '零位', dataIndex: 'zero', render: () => <div className="status-dot" /> },
      ]
    }
  ];

  // 轴数据
  const axisData = [
    { key: 0, name: '取料左右X', index: 0 },
    { key: 1, name: '取料前后Y', index: 1 },
    { key: 2, name: '取料旋转T', index: 2 },
  ];

  return (
    <div className="axis-config">
      <TopNav />
      <Card bordered={false}>
        <Table 
          columns={columns} 
          dataSource={axisData}
          size="small"
          pagination={false}
          bordered
        />
        
        <div className="motion-test">测试参数</div>
        
        <div className="params-section">
          <div className="param-item">
            <span>距离(毫米):</span>
            <InputNumber value={1000} />
          </div>
          <div className="param-item">
            <span>最大速度(毫米/秒):</span>
            <InputNumber value={5000} />
          </div>
          <div className="param-item">
            <span>加速度(毫米/秒²):</span>
            <InputNumber value={50000} />
          </div>
          <div className="param-item">
            <span>减速度(毫米/秒²):</span>
            <InputNumber value={50000} />
          </div>
          {/* 添加其他参数项 */}
        </div>

        <div className="motion-test">运动测试</div>
        
        <div className="control-buttons">
          <Space>
            <Button type="primary">连续+</Button>
            <Button>相对定长+</Button>
            <Button>绝对定长+</Button>
            <Button>往复运动</Button>
            <Button>规划位置清零</Button>
            <Button danger>停止</Button>
          </Space>
          <Space>
            <Button>连续-</Button>
            <Button>相对定长-</Button>
            <Button>绝对定长-</Button>
            <Button>回零</Button>
            <Button>实际位置清零</Button>
            <Button>使能</Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default AxisConfig; 