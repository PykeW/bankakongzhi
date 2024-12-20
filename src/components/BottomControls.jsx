import React from 'react';
import { Button, Select } from 'antd';
import './BottomControls.css';

const { Option } = Select;

const BottomControls = () => {
  return (
    <div className="bottom-controls">
      <div>
        工位：
        <Select defaultValue="取料" style={{ width: 120 }}>
          <Option value="取料">取料</Option>
          <Option value="放料">放料</Option>
        </Select>
      </div>
      <div>
        <Button type="primary">保存</Button>
        <Button style={{ marginLeft: 8 }}>取消</Button>
      </div>
    </div>
  );
};

export default BottomControls; 