import React from 'react';
import { Spin } from 'antd';
import { dynamic } from 'dva';
import styles from './global.css';
import { Route, Redirect, Switch, Router } from 'react-router';
import Modal from './pages/modal';
console.log("🚀  Modal:", Modal)

dynamic.setDefaultLoadingComponent(() => <Spin size="large" className={styles.globalSpin} />)

function RouterRedict({ history }) {
  return (
    <Switch>
      <Route exact path="/" component={Modal} />
      <Route exact path="/modal" component={Modal} />
      {/* <Router path="/" to="/" />
      <Redirect to="/" /> */}

    </Switch>
  );
}

export default RouterRedict;
