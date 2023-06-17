import { errorReturn } from "@/utils/errorRequest";
import { message } from "antd";
import md5 from "md5";
import { history } from "umi";
import { getLogin, getLogout, getAzureLogin } from "../services/login";
import utils from "@/utils/handleObject.js";

export default {
  namespace: "login",
  state: {
    userinfo: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/login") {
          dispatch({
            type: "clearData"
          });
        }
      });
    }
  },
  effects: {
    *fetchLogin({ payload }, { call, put }) {
      const response = yield call(getLogin, payload);
      if (response.code === 0) {
        localStorage.setItem("loginType", "admin");
        let { data: { token, user } } = response;
        user.role_id = Number(user.role_id)
        SaveUserInfo(token, user);
        yield put({
          type: "login",
          payload: user
        });
        PushHistory(user);
        message.success("登录成功");
      } else {
        message.error(response.message);
      }
    },
    *fetchLogout(_, { call, put }) {
      const response = yield call(getLogout);
      if (response.code === 0) {
        yield put({
          type: "logout"
        });
        utils.removeStore();
        let loginType = localStorage.getItem("loginType");
        if (loginType === 'ms') {
          history.push("/loginout");
        } else {
          history.push("/login");
          location.reload();
        }
      } else {
        message.error(response.message);
      }

    },
    *fetchAzureLogin({ payload, callback }, { call, put }) {
      const response = yield call(getAzureLogin, payload);
      if (response.code === 407) {
        message.warning(response.message);
        // 表示第一次自动注册
        history.push("/auth");
        return;
      } else if (response.code === 403) {
        // 表示账号被禁用
        message.error(response.message);
        return;
      } else if (response.code === 0) {
        localStorage.setItem("loginType", "ms");
        let { data: { token, user } } = response;
        user.role_id = Number(user.role_id)
        SaveUserInfo(token, user);
        if (callback) callback()
        yield put({
          type: "login",
          payload: user
        });
        PushHistory(user);
      } else {
        message.error(response.message);
      }
    },
  },
  reducers: {
    login(state, { payload }) {
      return {
        ...state,
        userinfo: payload
      };
    },
    logout(state) {
      return {
        ...state,
        userinfo: {}
      };
    },
  }
};

// 保存信息
function SaveUserInfo(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('lang', 'en');
  // localStorage.setItem('username', user.username);
}
// 跳转路由
function PushHistory(user) {
  const { role_id } = user;
  // 1超级管理员 2普通管理员 3普通用户
  if (role_id === 1 || role_id === 2) {
    history.push("/dataDashboard");
  } else {
    history.push("/brandSquare");
  }
}
