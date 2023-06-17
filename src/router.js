import React from 'react';
import { Spin } from 'antd';
import { dynamic } from 'dva';
import styles from './global.css';
import { Route, Redirect, Switch, Router } from 'react-router';
import NotFound from './pages/error/404';
import AUTH from './pages/test1';

dynamic.setDefaultLoadingComponent(() => <Spin size="large" className={styles.globalSpin} />)

function RouterRedict({ history }) {
  return (
    <Switch>
      <Router path="*" to="/moadl"/>
      <Redirect  to="/moadl" />
      <AUTH />
    </Switch>
  );
}

export default RouterRedict;
