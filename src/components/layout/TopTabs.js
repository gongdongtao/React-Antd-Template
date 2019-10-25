import React, { Component } from 'react';
import { routerData } from '../../mock/MockData';
import { Tabs, Icon, message } from 'antd';
const { TabPane } = Tabs;

export default class TopTabs extends Component {

    componentDidMount() {
        let route = routerData.find(d => d.path === this.props.location.pathname);
        if (route) {
            this.props.homeActions.setTopTabs([{path: route.path, tab: route.tab}]);
        }
    }

    componentWillUnmount() {
        this.props.homeActions.setTopTabs([]);
    }

    onTabsChange = key => {
        this.props.history.push(key);
    }

    onTabClose = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        const { topTabs } = this.props;
        if (topTabs.length === 1) {
            message.warning('这是最后一页，不能再关闭了啦');
            return;
        }
        let _topTabs = [...topTabs];
        let removedItems =  _topTabs.splice(index, 1);
        this.props.homeActions.setTopTabs(_topTabs);
        if (removedItems[0].path === this.props.location.pathname) {
            let targetIndex = index === 0 ? index + 1 : index - 1;
            this.props.history.push(topTabs[targetIndex].path);
        }
    }

    render() {
        const { topTabs } = this.props;
        return (
            <div className="top-tabs-wrapper">
                {topTabs && topTabs.length > 0 ? (
                    <Tabs activeKey={this.props.location.pathname} onChange={this.onTabsChange}>
                        {topTabs.map((item, index) => {
                            return (
                                <TabPane tab={<div><span>{item.tab}</span><Icon className="tab-close-icon" type="close" onClick={e => this.onTabClose(e, index)} /></div>} key={item.path} />
                            )
                        })}
                        {topTabs.length === 1 ? <TabPane tab="" key="fill-tab" /> : null}
                    </Tabs>
                ): null}
            </div>
        )
    }
}
