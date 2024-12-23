import React from 'react';
import { Form, InputNumber, Checkbox, Slider } from 'antd';
import './TestParams.css';

const TestParams = () => {
  return (
    <div className="test-params">
      <Form layout="horizontal" className="params-form">
        <div className="params-group">
          <div className="section-title">测试参数</div>
          <Form.Item label="距离 (毫米)" name="distance">
            <InputNumber min={0} max={10000} defaultValue={1000} />
          </Form.Item>
          <Form.Item label="最大速度 (毫米/秒)" name="maxSpeed">
            <InputNumber min={0} max={10000} defaultValue={5000} />
          </Form.Item>
          <Form.Item label="加速度 (毫秒)" name="acceleration">
            <InputNumber min={0} max={100000} defaultValue={50000} />
          </Form.Item>
          <Form.Item label="减速度 (毫秒)" name="deceleration">
            <InputNumber min={0} max={100000} defaultValue={50000} />
          </Form.Item>
          <Form.Item label="平滑时间 (毫秒)" name="smoothTime">
            <InputNumber min={0} max={1000} step={1} defaultValue={250} />
          </Form.Item>
          <Form.Item label="定位延时 (毫秒)" name="positionDelay">
            <InputNumber min={0} max={1000} defaultValue={50} />
          </Form.Item>
          <Form.Item label="往返次数" name="roundTrips">
            <InputNumber min={1} max={100} defaultValue={1} />
          </Form.Item>
        </div>
        
        <div className="params-group">
          <Form.Item label="正软限位使能" name="positiveLimitEnable" valuePropName="checked">
            <Checkbox defaultChecked />
          </Form.Item>
          <Form.Item label="正软限位置" name="positiveLimitPosition">
            <InputNumber min={0} max={1000} defaultValue={500} />
          </Form.Item>
          <Form.Item label="负软限位使能" name="negativeLimitEnable" valuePropName="checked">
            <Checkbox defaultChecked />
          </Form.Item>
          <Form.Item label="负软限位置" name="negativeLimitPosition">
            <InputNumber min={-1000} max={0} defaultValue={-500} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default TestParams; 