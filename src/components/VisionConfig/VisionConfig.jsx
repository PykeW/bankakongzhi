import React, { useState } from 'react';
import { Card, Table, Input, InputNumber, Select, Switch, Button, Tabs } from 'antd';
import { PlusOutlined, MinusOutlined, CameraOutlined } from '@ant-design/icons';
import './VisionConfig.css';

const { Option } = Select;

const VisionConfig = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [templates, setTemplates] = useState([
    { key: 0, name: '模板1', camera: '取料相机' },
    { key: 1, name: '模板2', camera: '取料相机' },
    { key: 2, name: '模板3', camera: '取料相机' },
  ]);

  const columns = [
    { 
      title: '序号', 
      dataIndex: 'key', 
      width: 80,
      className: 'column-center' 
    },
    { 
      title: '模板名称', 
      dataIndex: 'name'
    },
    { 
      title: '相机', 
      dataIndex: 'camera',
      render: (text) => (
        <Select defaultValue={text} className="camera-select">
          <Option value="取料相机">取料相机</Option>
          <Option value="放料相机">放料相机</Option>
        </Select>
      )
    }
  ];

  const cameraParams = [
    { label: '曝光时间(毫秒)', key: 'exposure', value: 0 },
    { label: '对比度', key: 'contrast', value: 0 },
    { label: '增益', key: 'gain', value: 0 },
    { label: '亮度', key: 'brightness', value: 0 }
  ];

  const lightParams = [
    { label: '主光源亮度', key: 'mainLight', value: 0 },
    { label: '环形灯亮度', key: 'ringLight', value: 0 },
    { label: '辅助光源1亮度', key: 'auxLight1', value: 0 },
    { label: '辅助光源2亮度', key: 'auxLight2', value: 0 }
  ];

  const templateParams = [
    { label: '宽度', key: 'width', value: 0 },
    { label: '高度', key: 'height', value: 0 },
    { label: '角度', key: 'angle', value: 0 }
  ];

  const searchParams = [
    { label: 'ROI宽度', key: 'roiWidth', value: 0 },
    { label: 'ROI高度', key: 'roiHeight', value: 0 },
    { label: '搜索角度', key: 'searchAngle', value: 0 },
    { label: '模板匹配角度', key: 'matchAngle', value: 0 },
    { label: '边缘角点', key: 'edgePoint', value: 0 },
    { label: '最大距离阈值', key: 'maxDistance', value: 0 }
  ];

  const handleAdd = () => {
    const newTemplate = {
      key: templates.length,
      name: `模板${templates.length + 1}`,
      camera: '取料相机'
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleDelete = () => {
    if (templates.length > 1) {
      setTemplates(templates.filter(item => item.key !== selectedTemplate));
      setSelectedTemplate(0);
    }
  };

  return (
    <div className="vision-config">
      <Card bordered={false}>
        <div className="vision-content">
          <div className="template-section">
            <div className="template-actions">
              <Button type="text" icon={<PlusOutlined />} onClick={handleAdd} />
              <Button type="text" icon={<MinusOutlined />} onClick={handleDelete} />
            </div>
            <Table
              columns={columns}
              dataSource={templates}
              pagination={false}
              size="small"
              rowClassName={(record) => record.key === selectedTemplate ? 'selected-row' : ''}
              onRow={(record) => ({
                onClick: () => setSelectedTemplate(record.key),
              })}
            />
          </div>

          <div className="params-section">
            <div className="params-group">
              <div className="group-title">相机参数</div>
              {cameraParams.map(param => (
                <div className="param-item" key={param.key}>
                  <span className="param-label">{param.label}</span>
                  <InputNumber className="param-input" value={param.value} />
                </div>
              ))}
            </div>

            <div className="params-group">
              <div className="group-title">光源</div>
              {lightParams.map(param => (
                <div className="param-item" key={param.key}>
                  <span className="param-label">{param.label}</span>
                  <InputNumber className="param-input" value={param.value} />
                </div>
              ))}
            </div>

            <div className="params-group">
              <div className="group-title">模板参数</div>
              {templateParams.map(param => (
                <div className="param-item" key={param.key}>
                  <span className="param-label">{param.label}</span>
                  <InputNumber className="param-input" value={param.value} />
                </div>
              ))}
              <div className="param-item">
                <span className="param-label">方法</span>
                <Select defaultValue="灰度" className="method-select">
                  <Option value="灰度">灰度</Option>
                  <Option value="彩色">彩色</Option>
                </Select>
              </div>
            </div>

            <div className="params-group">
              <div className="group-title">搜索参数</div>
              {searchParams.map(param => (
                <div className="param-item" key={param.key}>
                  <span className="param-label">{param.label}</span>
                  <InputNumber className="param-input" value={param.value} />
                </div>
              ))}
              <div className="param-item">
                <span className="param-label">开启损坏检测</span>
                <Switch defaultChecked />
              </div>
              <div className="param-item">
                <span className="param-label">开启ROI搜索</span>
                <Switch defaultChecked />
              </div>
              <div className="param-item">
                <span className="param-label">开启多模板匹配</span>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="params-group">
              <div className="group-title">PCB位置参数</div>
              <div className="param-item">
                <span className="param-label">X</span>
                <InputNumber className="param-input" value={0} />
              </div>
              <div className="param-item">
                <span className="param-label">Y</span>
                <InputNumber className="param-input" value={0} />
              </div>
            </div>
          </div>

          <div className="bottom-buttons">
            <Button icon={<CameraOutlined />}>其他振动板参数</Button>
            <Button>动态振动参数</Button>
            <Button>反光过滤参数</Button>
            <Button>子模板</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VisionConfig;