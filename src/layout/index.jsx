import React, { Component, useEffect, useState } from "react";
import { Layout, Menu, Button, ConfigProvider } from "antd";
const { Header, Content, Sider } = Layout;
import styles from "./index.less";
import LOGO from "src/assets/logo.png";
import collapsedPNG from "src/assets/collapsed.png";
import Info from "./info";
import { connect } from "dva";
import { history } from "@@/core/history";
import utils from "src/utils/handleObject";
import { PoweroffOutlined } from "@ant-design/icons";
import classNames from "classnames";
import MenuItem from "./menu";
import "moment/locale/zh-cn";
import zhCN from "antd/es/locale/zh_CN";

const LayoutElement = (props) => {
  const { dispatch } = props;
  const [collapsed, setCollapsed] = useState(false);

  // Mount
  useEffect(() => {
    let zoom = utils.zoomScreen();
    // document.body.style.zoom = zoom;

    let userinfo = JSON.parse(localStorage.getItem("user"));
    if (!userinfo) {
      history.push("/login");
      return;
    }
    setUserinfo(userinfo);
  }, []);

  const [userinfo, setUserinfo] = useState({});

  const handleLogout = () => {
    dispatch({
      type: "login/fetchLogout",
    });
  };
  // 获取当前选择的菜单
  const getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = props;
    return pathname.split("/")[1];
  };

  let selectedKeys = getSelectedMenuKeys();
  return (
    <Layout className={styles["layout"]}>
      <Sider
        className={styles["sider"]}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles["logo"]}>
          <img src={LOGO} />
        </div>
        <Menu
          theme="dark"
          selectedKeys={[selectedKeys]}
          mode="inline"
          items={MenuItem(userinfo)}
          className={styles["menu"]}
          onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
            history.push(`/${key}`);
          }}
        />
      </Sider>
      <Layout>
        <div
          className={styles["main"]}
          style={
            collapsed
              ? { width: "calc(100% - 80px)", marginLeft: 80 }
              : { width: "calc(100% - 200px)", marginLeft: 200 }
          }
        >
          {/* 缩放菜单按钮 */}
          <div
            style={collapsed ? { left: 64 } : {}}
            className={classNames({
              [styles["collapsed"]]: true,
              [styles["collapsedClose"]]: collapsed,
            })}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            <img src={collapsedPNG} />
          </div>
          <Header
            className={styles["header"]}
            style={
              collapsed
                ? { width: "calc(100% - 80px)" }
                : { width: "calc(100% - 200px)" }
            }
          >
            <div className={styles["header-warp"]}>
              <div className={styles["slogan"]}>EC Review System</div>
              <div className={styles["info"]}>
                <div className={styles["lang"]}></div>
                <div className={styles["nickname"]}>
                  {userinfo?.username || "-"}
                </div>
                <div className={styles["exit"]} onClick={handleLogout}>
                  <PoweroffOutlined />
                </div>
                <div className={styles["info-popover"]}>
                  <Info />
                </div>
              </div>
            </div>
          </Header>
          <ConfigProvider locale={zhCN}>
            <Content className={styles["content"]}>{props.children}</Content>
          </ConfigProvider>
        </div>
      </Layout>
    </Layout>
  );
};

export default connect(({ login }) => ({
  login,
}))(LayoutElement);
