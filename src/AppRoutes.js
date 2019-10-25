import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom'; // Redirect, withRouter, matchPath
import { Spin } from 'antd';

import Main from './pages/Main';
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Page1 = lazy(() => import('./pages/Page1'));
const Page2 = lazy(() => import('./pages/Page2'));
const Other = lazy(() => import('./pages/Other'));

// const AppRoutes = () => {
class AppRoutes extends Component {
  render() {
    return (
      <Main>
        <Suspense fallback={<PageLoading />}>
            <Switch>
              <Route exact path='/' render={props => <Home {...props} />} />
              <Route path='/login' render={props => <Login {...props} />} />
              <Route path='/home' render={props => <Home {...props} />} />
              <Route path='/page1' render={props => <Page1 {...props} />} />
              <Route path='/page2' render={props => <Page2 {...props} />} />
              <Route path='/*' render={props => <Other {...props} />} />
            </Switch>
        </Suspense>
      </Main>
    )
  }
}

export default AppRoutes;

function PageLoading() {
  return (
    <Spin size="large" tip="加载中..."><div style={{height: '200px'}}></div></Spin>
  )
}
