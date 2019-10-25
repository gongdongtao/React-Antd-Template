import React, { Component } from "react";
import Store from '../../script/store';
import { isSmallScreen } from '../../script/Utils';
import GlabalMenu from './GlobalMenu';
import {
  Layout,
  Icon,
  Badge,
  Avatar,
  Dropdown,
  Menu,
  message,
  Modal,
  Popover
} from "antd";
const { Header } = Layout;
const { confirm } = Modal;

const languages = [
    { label: '中文', value: 'zh-CN' },
    { label: '英文', value: 'en-US' }
];

export default class GlobalHeader extends Component {
  handleMenuClick = e => {
    switch (e.key) {
      case "3":
        this.props.openSettingDrawer && this.props.openSettingDrawer();
        break;
      case 'zh-CN':
      case 'en-US':
          this.props.homeActions.setLanguage(e.key);
          Store.set('language', e.key);
          setTimeout(() => {
            message.success('设置成功');
          }, 20);
          break;
      default:
        message.info("Click on menu item." + e.key);
        break;
    }
  };

  onLogout = () => {
    confirm({
      title: "提示",
      content: "真的要注销登录吗 ?",
      okType: "danger",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
          this.props.history.push('/login');
      },
      onCancel: () => {
        console.log("Cancel");
      }
    });
  };

  render() {
    const { language, defaultSettings, breakPoint } = this.props;
    const { navType, navTheme } = defaultSettings;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="user" /> 个人中心
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="setting" /> 账户设置
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="tool" /> 系统设置
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="lock" /> 密码修改
        </Menu.Item>
        <Menu.SubMenu key="lang" title={<span className="menu-lang-item-title"><Icon type="global" />语言设置</span>}>
          {languages.map(item => {
            let isCheck = language === item.value;
            return (
              <Menu.Item key={item.value}>
                <span className={"lang-check" + (isCheck ? " checked": "")}>
                  {isCheck ? <Icon type="check"/> : null}{item.label}
                </span>
              </Menu.Item>
            )
          })}
        </Menu.SubMenu>
      </Menu>
    );
    return (
      <Header className={"global-header " + navType + " " + navTheme}>
        <div className="header-left">
            {isSmallScreen(breakPoint) ? (
                <>
                    <div className="header-logo">
                        <span className="logo-text">图片</span>
                    </div>
                    <div className="menu-item" onClick={this.props.toggle}>
                        <Icon
                        className="trigger"
                        type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
                        />
                    </div>
                </>
            ): (
                <>
                    {navType === 'topNav' ? (
                        <>
                            <div className="header-logo">
                                <span className="logo-text">图片和标题</span>
                            </div>
                            <div className="menu-content">
                                <GlabalMenu mode="horizontal" {...this.props} />
                            </div>
                        </>
                    ): (
                        <>
                            <div className="menu-item" onClick={this.props.toggle}>
                                <Icon
                                className="trigger"
                                type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
                                />
                            </div>
                            <div>欢迎进入</div>
                        </>
                    )}
                </>
            )}
        </div>
        <div className="header-right">
          <Popover
            placement="bottomRight"
            content={
              <div style={{ width: "200px" }}>
                <p>消息1</p>
                <p>消息2</p>
              </div>
            }
            trigger="click"
          >
            <div className="menu-item">
              <Badge count={5} offset={[5, -5]}>
                <Icon type="bell" />
              </Badge>
            </div>
          </Popover>

          <Dropdown overlay={menu}>
            <div className="menu-item">
              <Avatar
                size="small"
                src="https://eccqa.weadmin.com/itsm/ecc/static/media/Tulips.fafa5efe.jpg"
              />
              {isSmallScreen(breakPoint) ? null: <span className="user-file">欢迎您，Admin</span>}
            </div>
          </Dropdown>
          <div className="menu-item" onClick={this.onLogout}>
            <Icon type="logout" />
            {isSmallScreen(breakPoint) ? null: <span className="user-file">退出登录</span>}
          </div>
        </div>
      </Header>
    );
  }
}
