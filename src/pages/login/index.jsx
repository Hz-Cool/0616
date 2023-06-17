import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import styles from "./index.less";
import { connect } from "dva";
import LOGO from "src/assets/logo.png";
import { history } from "umi";
import CaptchaCode from "./captchaCode";

const FormItem = Form.Item;

const Login = (props) => {
  const { dispatch, loadingLogin } = props;
  const [form] = Form.useForm();
  const [captchaCode, setCaptchaCode] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token") || "";
    let user = localStorage.getItem("user") || "";
    if (token && user) {
      user = JSON.parse(user);
      const { role_id } = user;
      // 1超级管理员 2普通管理员 3普通用户
      if (role_id === 1 || role_id === 2) {
        history.push("/dataDashboard");
      } else {
        history.push("/brandSquare");
      }
    }
  }, []);

  // 登录
  const Login = (data) => {
    dispatch({
      type: "login/fetchLogin",
      payload: {
        ...data,
      },
    });
  };

  // 获取表单
  const onFinish = (values) => {
    Login(values);
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["left"]}>
        <div className={styles["logo"]}>
          <img src={LOGO} />
        </div>
        <div className={styles["welcome"]}>
          <div className={styles["p1"]}>欢迎登录</div>
          <div className={styles["p2"]}>Welcome To Login</div>
          <div className={styles["p3"]}></div>
        </div>
      </div>
      <div className={styles["right"]}>
        <div className={styles["form"]}>
          <div className={styles["title"]}>
            <div>系统登录</div>
          </div>
          <Form onFinish={onFinish} form={form} layout={"vertical"}>
            <FormItem
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱",
                },
              ]}
            >
              <Input size="large" placeholder="请输入邮箱" />
            </FormItem>
            <FormItem
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
                {
                  pattern: "^[0-9a-zA-Z]+$",
                  message: "仅仅支持字母和数字！",
                },
              ]}
            >
              <Input size="large" type="password" placeholder="请输入密码" />
            </FormItem>
            <Form.Item
              name="captcha-code"
              label="验证码"
              rules={[
                {
                  validator: async (rule, value) => {
                    if (value !== captchaCode) {
                      throw new Error("验证码错误");
                    }
                  },
                },
              ]}
            >
              <CaptchaCode setCaptchaCode={setCaptchaCode} />
            </Form.Item>
            <FormItem>
              <Button
                size="large"
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
                loading={loadingLogin}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  login,
  loadingLogin: loading.effects["login/fetchLogin"],
}))(Login);
