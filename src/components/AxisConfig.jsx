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

  return (
    <div className="axis-config">
      <TopNav />
      <Card bordered={false}>
        <div className="table-header">
          <Table 
            columns={columns} 
            dataSource={axisData}
            size="small"
            pagination={false}
            bordered
          />
          <div className="table-actions">
            <Button type="text" icon={<PlusOutlined />} />
            <Button type="text" icon={<MinusOutlined />} />
          </div>
        </div>
        
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