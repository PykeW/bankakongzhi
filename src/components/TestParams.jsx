import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import './TestParams.css';

const TestParams = () => {
  return (
    <div className="test-params">
      <div className="section-title">测试参数</div>
      <Form layout="horizontal" className="params-form">
        <div className="params-group">
          <Form.Item label="距离 (毫米)" name="distance">
            <Input defaultValue="1000" />
          </Form.Item>
          <Form.Item label="最大速度 (毫米/秒)" name="maxSpeed">
            <Input defaultValue="5000" />
          </Form.Item>
          <Form.Item label="加速度 (毫秒)" name="acceleration">
            <Input defaultValue="50000" />
          </Form.Item>
          <Form.Item label="减速度 (毫秒)" name="deceleration">
            <Input defaultValue="50000" />
          </Form.Item>
          <Form.Item label="平滑时间 (毫秒)" name="smoothTime">
            <Input defaultValue="0.25" />
          </Form.Item>
          <Form.Item label="定位延时 (毫秒)" name="positionDelay">
            <Input defaultValue="50" />
          </Form.Item>
          <Form.Item label="往返次数" name="roundTrips">
            <Input defaultValue="1" />
          </Form.Item>
        </div>
        
        <div className="params-group">
          <Form.Item label="正软限位使能" name="positiveLimitEnable" valuePropName="checked">
            <Checkbox defaultChecked />
          </Form.Item>
          <Form.Item label="正软限位置" name="positiveLimitPosition">
            <Input defaultValue="500" />
          </Form.Item>
          <Form.Item label="负软限位使能" name="negativeLimitEnable" valuePropName="checked">
            <Checkbox defaultChecked />
          </Form.Item>
          <Form.Item label="负软限位置" name="negativeLimitPosition">
            <Input defaultValue="-500" />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default TestParams; 