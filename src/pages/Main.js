import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IntlProvider } from 'react-intl';
import { QueryBreakPoint, isSmallScreen } from '../script/Utils';
import GlobalSider from '../components/layout/GlobalSider';
import GlobalHeader from '../components/layout/GlobalHeader';
import SettingDrawer from '../components/layout/SettingDrawer';
import TopTabs from '../components/layout/TopTabs';
import * as homeActions from '../actions/home_action';

import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

import appLocale_en from '../locales/en_US';
import appLocale_zh from '../locales/zh_CN';

import { ConfigProvider, Layout } from 'antd';

const { Footer, Content } = Layout;

const antdLocales = {
  'zh-CN': zhCN,
  'en-US': enUS
};

const appLocales = {
  'zh-CN': appLocale_zh,
  'en-US': appLocale_en
};

class Main extends Component {

  constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        settingDrawerVisible: false,
      };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHanlder);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHanlder);
  }

  resizeHanlder = () => {
    let breakPoint = QueryBreakPoint();
    if (breakPoint !== this.props.breakPoint) {
      this.props.homeActions.setBreakPoint(breakPoint);
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  openSettingDrawer = () => {
    this.setState({settingDrawerVisible: true});
  }

  closeSettingDrawer = () => {
      this.setState({settingDrawerVisible: false});
  }

  render() {
    const { settingDrawerVisible, collapsed } = this.state;
    const { language, defaultSettings, breakPoint } = this.props;
    const { fixedHeader, fixedSider, navType, useTopTabs } = defaultSettings;
    const pathname = this.props.location.pathname;
    let content = null;
    if (['/login'].indexOf(pathname) > -1) {
      content = this.props.children;
    } else {
      content = (
        <Layout className={"app-wrapper scrollbar " + navType + (collapsed ? " collapsed" : "") + (fixedHeader ? " fixedHeader": "") + (fixedSider ? " fixedSider": "") + (isSmallScreen(breakPoint) ? " mobile": "")}>
            <GlobalSider collapsed={collapsed} {...this.props} toggle={this.toggle} />
            <Layout className="app-right-wrapper"> 
                <GlobalHeader collapsed={collapsed} toggle={this.toggle} openSettingDrawer={this.openSettingDrawer} {...this.props} />
                <Content>
                  {useTopTabs ? <TopTabs {...this.props} /> : null}
                  <div
                    style={{
                      margin: '12px 12px 0px',
                      padding: '24px 32px',
                      background: '#fff',
                      minHeight: 1680,
                    }}
                  >
                    {this.props.children}
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            <SettingDrawer visible={settingDrawerVisible} {...this.props} onClose={this.closeSettingDrawer} />
        </Layout>
      );
    }
    return (
      <ConfigProvider locale={antdLocales[language]}>
        <IntlProvider locale={language} messages={appLocales[language].messages}>
            {content}
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = (state) => {
  let { loadingStatus, language, userInfo, defaultSettings, breakPoint, topTabs } = state.homeReducer;
  return {
    loadingStatus,
    userInfo,
    language,
    defaultSettings,
    breakPoint,
    topTabs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Main))
