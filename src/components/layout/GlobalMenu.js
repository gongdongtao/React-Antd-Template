import React, { Component } from 'react';
import { routerData } from '../../mock/MockData';
import { Menu, Icon } from 'antd';

export default class GlobalMenu extends Component {

    onMenuItemClick = (e) => {
        this.props.history.push(e.key);
        if (this.props.defaultSettings.useTopTabs) {
            const { topTabs } = this.props;
            const route = topTabs.find(d => d.path === e.key);
            if (!route) {
                const item = routerData.find(d => d.path === e.key);
                if (item) {
                    this.props.homeActions.setTopTabs([...topTabs, { path: e.key, tab: item.tab }]);
                }
            }
        }
    }

    render() {
        const { defaultSettings, mode } = this.props;
        const { navTheme } = defaultSettings;
        return (
            <Menu theme={navTheme} mode={mode ? mode : "inline"} onClick={this.onMenuItemClick} selectedKeys={[this.props.location.pathname]}>
                <Menu.Item key="/">
                    <Icon type="home" />
                    <span>首页</span>
                </Menu.Item>
                <Menu.SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="mail" />
                            <span>个人办公</span>
                        </span>
                    }
                >
                    <Menu.Item key="/page1">
                        <span>页面1</span>
                    </Menu.Item>
                    <Menu.Item key="/page2">
                        <span>页面2</span>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="/page3">
                    <Icon type="home" />
                    <span>页面3</span>
                </Menu.Item>
                <Menu.Item key="/page4">
                    <Icon type="home" />
                    <span>页面4</span>
                </Menu.Item>
                <Menu.Item key="/page5">
                    <Icon type="home" />
                    <span>页面5</span>
                </Menu.Item>
                <Menu.Item key="/page6">
                    <Icon type="home" />
                    <span>页面6</span>
                </Menu.Item>
                <Menu.Item key="/page7">
                    <Icon type="home" />
                    <span>页面7</span>
                </Menu.Item>
                <Menu.Item key="/page8">
                    <Icon type="home" />
                    <span>页面8</span>
                </Menu.Item>
                <Menu.Item key="/page9">
                    <Icon type="home" />
                    <span>页面9</span>
                </Menu.Item>
                <Menu.Item key="/page10">
                    <Icon type="home" />
                    <span>页面10</span>
                </Menu.Item>
            </Menu>
        )
    }
}
