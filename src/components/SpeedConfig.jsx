import React, { useState } from 'react';
import { Card, Table, Input, Button, Select } from 'antd';
import './SpeedConfig.css';

const { Option } = Select;

const SpeedConfig = () => {
  const [speedData, setSpeedData] = useState([
    { key: '1', name: '高速 (毫米/秒)', x: 150000, y: 150000, t: 150000 },
    { key: '2', name: '中速 (毫米/秒)', x: 30000, y: 30000, t: 30000 },
    { key: '3', name: '低速 (毫米/秒)', x: 10000, y: 10000, t: 10000 },
    { key: '4', name: '加速度 (毫米/秒²)', x: 10000, y: 10000, t: 10000 },
    { key: '5', name: '减速度 (毫米/秒²)', x: 10000, y: 10000, t: 10000 },
    { key: '6', name: '平滑时间 (毫秒)', x: 1, y: 1, t: 1 },
    { key: '7', name: '启动速度 (毫米/秒)', x: 0, y: 0, t: 0 },
    { key: '8', name: '结束速度 (毫米/秒)', x: 0, y: 0, t: 0 },
    { key: '9', name: '最大速度 (毫米/秒)', x: 300000, y: 300000, t: 300000 }
  ]);

  const [delayData, setDelayData] = useState([
    { key: '1', name: '换向延时', value: 0 },
    { key: '2', name: '换列延时', value: 0 },
    { key: '3', name: '群控延时', value: 0 },
    { key: '4', name: '对准延时', value: 0 },
    { key: '5', name: '指定位延时', value: 0 },
    { key: '6', name: 'PR前后偏差显示延时', value: 0 },
    { key: '7', name: 'PR左右偏差显示延时', value: 0 },
    { key: '8', name: '闭后偏差显示延时', value: 0 }
  ]);

  const handleSpeedInputChange = (key, field, value) => {
    setSpeedData(prevData =>
      prevData.map(item =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleDelayInputChange = (key, value) => {
    setDelayData(prevData =>
      prevData.map(item =>
        item.key === key ? { ...item, value } : item
      )
    );
  };

  const speedColumns = [
    { title: '速度列表', dataIndex: 'name', width: '25%' },
    {
      title: '取料左右X',
      dataIndex: 'x',
      width: '25%',
      render: (text, record) => (
        <Input
          value={text}
          onChange={e => handleSpeedInputChange(record.key, 'x', e.target.value)}
        />
      )
    },
    {
      title: '取料前后Y',
      dataIndex: 'y',
      width: '25%',
      render: (text, record) => (
        <Input
          value={text}
          onChange={e => handleSpeedInputChange(record.key, 'y', e.target.value)}
        />
      )
    },
    {
      title: '取料旋转T',
      dataIndex: 't',
      width: '25%',
      render: (text, record) => (
        <Input
          value={text}
          onChange={e => handleSpeedInputChange(record.key, 't', e.target.value)}
        />
      )
    }
  ];

  const delayColumns = [
    { title: '延时设置 (毫秒)', dataIndex: 'name', width: '25%' },
    {
      title: '值',
      dataIndex: 'value',
      width: '25%',
      render: (text, record) => (
        <Input
          value={text}
          onChange={e => handleDelayInputChange(record.key, e.target.value)}
        />
      )
    },
    { title: '', dataIndex: 'empty1', width: '25%' },
    { title: '', dataIndex: 'empty2', width: '25%' }
  ];

  const handleSave = () => {
    console.log('保存数据:', speedData, delayData);
    // 在这里实现保存逻辑
  };

  return (
    <div className="speed-config">
      <Card bordered={false}>
        <Table
          columns={speedColumns}
          dataSource={speedData}
          size="small"
          pagination={false}
          bordered
        />
        <Table
          columns={delayColumns}
          dataSource={delayData}
          size="small"
          pagination={false}
          bordered
          className="delay-table"
        />
      </Card>
      <div className="bottom-controls">
        <div>
          工位：
          <Select defaultValue="取料" style={{ width: 120 }}>
            <Option value="取料">取料</Option>
            <Option value="放料">放料</Option>
          </Select>
        </div>
        <div>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
          <Button style={{ marginLeft: 8 }}>取消</Button>
        </div>
      </div>
    </div>
  );
};

export default SpeedConfig; 