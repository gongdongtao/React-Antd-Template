import React, { Component } from 'react';
import DefaultSettings from '../../defaultSettings';
import { Drawer, Icon, Row, Col, Tooltip, Divider, Switch, message } from 'antd';
import Store from '../../script/store';

let colorList = [
    {
      key: 'dust',
      color: '#F5222D',
    },
    {
      key: 'volcano',
      color: '#FA541C',
    },
    {
      key: 'sunset',
      color: '#FAAD14',
    },
    {
      key: 'cyan',
      color: '#13C2C2',
    },
    {
      key: 'green',
      color: '#52C41A',
    },
    {
      key: 'daybreak',
      color: '#1890FF',
    },
    {
      key: 'geekblue',
      color: '#2F54EB',
    },
    {
      key: 'purple',
      color: '#722ED1',
    },
];

export default class SettingDrawer extends Component {

    componentDidMount() {
        if (this.props.defaultSettings.primaryColor !== '#1890ff') {
            window.less.modifyVars({'@primary-color': this.props.defaultSettings.primaryColor});
        }
    }

    onDefaultSettingChange = (key, value) => {
        let defaultSettings = Object.assign({}, this.props.defaultSettings, {[key]: value});
        this.props.homeActions.setDefaultSettings(defaultSettings);
        Store.set('defaultSettings', JSON.stringify(defaultSettings));
        if (key === 'primaryColor') {
            const hide = message.loading('正在编译主题!', 0);
            setTimeout(() => {
                window.less
                .modifyVars({'@primary-color': value})
                .then(() => { hide() })
                .catch(() => {
                    hide();
                    message.error('修改失败');
                });
            }, 500);
        }
    }

    onResetClick = () => {
        Store.delete('defaultSettings');
        this.props.homeActions.setDefaultSettings(Object.assign({}, DefaultSettings));
        const hide = message.loading('正在恢复默认主题!', 0);
        setTimeout(() => {
            window.less
            .modifyVars({'@primary-color': DefaultSettings.primaryColor})
            .then(() => { hide() })
            .catch(() => {
                hide();
                message.error('修改失败');
            });
        }, 500);
    }

    render() {
        const { defaultSettings } = this.props;
        const { navType, navTheme, primaryColor, useTopTabs, fixedHeader, fixedSider } = defaultSettings;
        return (
            <Drawer
                className="settingDrawer"
                placement="right"
                closable={false}
                width={300}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <div className="drawer-bar">
                    <span className="reset-text" onClick={this.onResetClick}>恢复默认设置</span>
                    <Icon type="close" onClick={this.props.onClose} style={{padding: '0px 15px', fontSize: '16px'}} />
                </div>
                <div style={{maxHeight: 'calc(100% - 40px)', overflow: 'auto', padding: '0 24px 24px 24px'}}>
                    <div style={{marginBottom: '12px', color: '#000'}}>整体风格设置</div>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Tooltip title="暗色菜单风格">
                            <div style={{position: 'relative'}}>
                                <img
                                    style={{cursor: 'pointer'}}
                                    src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt=""
                                    onClick={()=>{this.onDefaultSettingChange('navTheme', 'dark')}}
                                />
                                <div style={{position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', display: navTheme === 'dark' ? 'block' : 'none'}}>
                                    <Icon type="check" />
                                </div>
                            </div>
                            </Tooltip>
                        </Col>
                        <Col span={6}>
                            <Tooltip title="亮白菜单风格">
                            <div style={{position: 'relative'}}>
                                <img
                                    style={{cursor: 'pointer'}}
                                    src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt=""
                                    onClick={()=>{this.onDefaultSettingChange('navTheme', 'light')}}
                                />
                                <div style={{position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', display: navTheme === 'light' ? 'block' : 'none'}}>
                                    <Icon type="check" />
                                </div>
                            </div>
                            </Tooltip>
                        </Col>
                    </Row>
                    <div style={{marginBottom: '12px', marginTop: '20px', color: '#000'}}>主题色</div>
                    <div className="clearfloat">
                        {colorList.map(({ key, color }) => (
                            <Tooltip key={color} title={key}>
                                <div
                                    className="colorBlock"
                                    style={{backgroundColor: color}}
                                    onClick={()=>this.onDefaultSettingChange('primaryColor', color)}
                                >
                                    {primaryColor === color ? <Icon type="check" /> : ''}
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                    <Divider />
                    <div style={{marginBottom: '12px', color: '#000'}}>导航模式</div>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Tooltip title="侧边菜单布局">
                                <div style={{position: 'relative'}}>
                                    <img
                                        style={{cursor: 'pointer'}}
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" alt=""
                                        onClick={()=>{this.onDefaultSettingChange('navType', 'sideNav')}}
                                    />
                                    <div style={{position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', display: navType === 'sideNav' ? 'block' : 'none'}}>
                                        <Icon type="check" />
                                    </div>
                                </div>
                            </Tooltip>
                        </Col>
                        <Col span={6}>
                            <Tooltip title="顶部菜单布局">
                                <div style={{position: 'relative'}}>
                                    <img
                                        style={{cursor: 'pointer'}}
                                        src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" alt=""
                                        onClick={()=>{this.onDefaultSettingChange('navType', 'topNav')}}
                                    />
                                    <div style={{position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', display: navType === 'topNav' ? 'block' : 'none'}}>
                                        <Icon type="check" />
                                    </div>
                                </div>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Divider />
                    <div style={{marginBottom: '12px', color: '#000'}}>其他设置</div>
                    <div className="other-item">
                        <span className="other-item-label">固定 Header</span>
                        <Switch size="small" checked={fixedHeader} onChange={checked => this.onDefaultSettingChange('fixedHeader', checked)} />
                    </div>
                    <div className="other-item">
                        <span className="other-item-label">固定侧边菜单</span>
                        <Switch size="small" checked={fixedSider} onChange={checked => this.onDefaultSettingChange('fixedSider', checked)} />
                    </div>
                    <div className="other-item">
                        <span className="other-item-label">多页签模式</span>
                        <Switch size="small" checked={useTopTabs} onChange={checked => this.onDefaultSettingChange('useTopTabs', checked)}  />
                    </div>
                </div>
            </Drawer>
        )
    }
}
