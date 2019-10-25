import React, { Component } from 'react';
import { isSmallScreen } from '../../script/Utils';
import GlobalMenu from './GlobalMenu';
import { Layout, Drawer } from 'antd';
const { Sider } = Layout;

export default class GlobalSider extends Component {

    render() {
        const { defaultSettings, breakPoint, collapsed } = this.props;
        
        const { navType, navTheme } = defaultSettings;

        const subContent = (
            <>
                <div className={"sider-logo " + navType + " " + navTheme} >
                    <span className="logo-text">图片和标题</span>
                </div>
                <GlobalMenu {...this.props} />
            </>
        );

        let siderProps = {
            trigger: null,
            collapsible: true,
            collapsed: collapsed,
            theme: navTheme,
        };

        if (isSmallScreen(breakPoint)) {
            siderProps.collapsed = false;
            return (
                <Drawer
                    className="sider-menu-drawer"
                    closable={false}
                    width={200}
                    placement="left"
                    onClose={this.props.toggle}
                    visible={!collapsed}
                >
                    <Sider {...siderProps}>
                        {subContent}
                    </Sider>
                </Drawer>
            )
        } else if(navType === 'sideNav') {
            return (
                <Sider {...siderProps}>
                        {subContent}
                </Sider>
            )
        } else {
            return null;
        }
    }
}
