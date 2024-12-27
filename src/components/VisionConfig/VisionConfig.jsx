import React, { useState } from 'react';
import { Card, Table, Input, InputNumber, Select, Switch, Button, Tabs } from 'antd';
import { PlusOutlined, MinusOutlined, CameraOutlined, AppstoreOutlined, ToolOutlined, PlayCircleOutlined, SyncOutlined, AimOutlined, EditOutlined, SearchOutlined, FilterOutlined, BlockOutlined } from '@ant-design/icons';
import './VisionConfig.css';

const { Option } = Select;
const { TabPane } = Tabs;

const VisionConfig = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [templates, setTemplates] = useState([
    { key: 0, name: '模板1', camera: '取料相机' },
    { key: 1, name: '模板2', camera: '取料相机' },
    { key: 2, name: '模板3', camera: '取料相机' },
  ]);
  const [activeTab, setActiveTab] = useState('template');

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
    { label: '最大距离阈值', key: 'maxDistance', value: 20000 },
    { label: '步进搜索精度', key: 'stepPrecision', value: 5 }
  ];

  const calibrationParams = [
    { label: '相机定位速度', key: 'camSpeed', value: 0 },
    { label: '相机定位延时', key: 'camDelay', value: 0 },
    { label: '相机类型', key: 'camType', value: '取料相机' },
  ];

  const pointParams = [
    { label: '点1', x: 0, y: 0 },
    { label: '点2', x: 0, y: 0 },
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
          {activeTab === 'template' && (
            <>
              <div className="scrollable-content">
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
                    <div className="template-action-buttons">
                      <Button icon={<EditOutlined />}>其他模板参数</Button>
                      <Button icon={<SearchOutlined />}>缺陷模板参数</Button>
                      <Button icon={<FilterOutlined />}>灰度过滤参数</Button>
                      <Button icon={<BlockOutlined />}>子模板</Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'calibration' && (
            <div className="calibration-content">
              <div className="params-group">
                <div className="group-title">相机标定</div>
                <div className="param-item">
                  <span className="param-label">相机标定</span>
                  <InputNumber className="param-input" value={0} />
                </div>
                <div className="param-item">
                  <span className="param-label">模板高度</span>
                  <InputNumber className="param-input" value={0} />
                </div>
                <div className="param-item">
                  <span className="param-label">待标定相机</span>
                  <Select defaultValue="取料相机" className="camera-select">
                    <Option value="取料相机">取料相机</Option>
                    <Option value="放料相机">放料相机</Option>
                  </Select>
                </div>
              </div>

              <div className="point-section">
                <div className="point-table">
                  <div className="point-row header">
                    <div className="label-cell">点位</div>
                    <div className="value-cells">
                      <div>X</div>
                      <div>Y</div>
                    </div>
                  </div>
                  <div className="point-row">
                    <div className="label-cell">点1</div>
                    <div className="value-cells">
                      <InputNumber value={0} />
                      <InputNumber value={0} />
                    </div>
                  </div>
                  <div className="point-row">
                    <div className="label-cell">点2</div>
                    <div className="value-cells">
                      <InputNumber value={0} />
                      <InputNumber value={0} />
                    </div>
                  </div>
                </div>

                <div className="point-action-container">
                  <Button 
                    className="calibration-button calibration-camera"
                    icon={<CameraOutlined />}
                  >
                    开始标定
                  </Button>
                </div>
              </div>

              <div className="params-group">
                <div className="group-title">旋转标定</div>
                <div className="param-item">
                  <span className="param-label">最大搜索距离</span>
                  <InputNumber className="param-input" value={20000} />
                </div>
                <div className="param-item">
                  <span className="param-label">芯片自动搜索模式</span>
                  <Switch defaultChecked />
                </div>
                <div className="param-item">
                  <span className="param-label">旋转步进角度</span>
                  <InputNumber className="param-input" value={5} />
                </div>
              </div>

              <div className="calibration-steps">
                <div className="step-item">
                  <div className="step-title">第一步</div>
                  <div className="step-content">定位一个芯片，手动进行自动搜索</div>
                  <div className="step-container step-first">
                    <Button 
                      className="calibration-button" 
                      icon={<PlayCircleOutlined />}
                    >
                      开始标定
                    </Button>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-title">第二步</div>
                  <div className="step-content">手动修正</div>
                  <div className="step-actions">
                    <Button 
                      className="calibration-button" 
                      icon={<SyncOutlined />}
                    >
                      开始往复运动
                    </Button>
                    <Button 
                      className="calibration-button" 
                      icon={<AimOutlined />}
                    >
                      修改旋转中心
                    </Button>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-title">第三步</div>
                  <div className="step-content">T轴旋转一周验证标定</div>
                  <Button 
                    className="calibration-button" 
                    icon={<SyncOutlined />}
                  >
                    开始标定
                  </Button>
                </div>
              </div>

              <div className="params-group">
                <div className="result-table">
                  <div className="result-row header">
                    <div className="label-cell">标定结果</div>
                    <div className="value-cells">
                      <div>X</div>
                      <div>Y</div>
                    </div>
                  </div>
                  <div className="result-row">
                    <div className="label-cell">芯片旋转中心</div>
                    <div className="value-cells">
                      <InputNumber value={0} />
                      <InputNumber value={0} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      <Tabs activeKey={activeTab} onChange={setActiveTab} tabPosition="bottom">
        <TabPane tab={<span><AppstoreOutlined />模板</span>} key="template" />
        <TabPane tab={<span><ToolOutlined />标定</span>} key="calibration" />
      </Tabs>
    </div>
  );
};

export default VisionConfig;