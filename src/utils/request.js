/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
// import { extend } from 'umi-request';
import { message, notification } from "antd";
import { fetch, routerRedux, useStore } from "dva";
import { stringify } from "qs";
import { history } from "umi";
import utils from "@/utils/handleObject.js";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status <= 504 && response.status >= 500) {
    notification.error({
      message: "系统错误！请联系客服专员解决。",
      key: 'SystemError',
      duration: 8,
    });
    const errortext = codeMessage[response.status] || response.statusText;
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
  } else {
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errortext,
      key: 'RequestError',
      duration: 8,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
  }
}
/**
 * 配置request请求时的默认参数,测试中，后期根据后台接口所需要的值来做相应的修改
 */

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const token = localStorage.getItem("token");
  const defaultOptions = {
    credentials: "omit"
  };
  // 默认请求是否带上cookie
  let newOptions = { ...defaultOptions, ...options };

  // 配置signal
  if (newOptions.body && newOptions.body.signal) {
    const signal = newOptions.body.signal;
    delete newOptions.body.signal;
    newOptions = { ...newOptions, signal };
  }
  if (newOptions.method === "POST" || newOptions.method === "PUT") {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        // 兼容后端写法
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        AUTHORIZATION: token,
        ...newOptions.headers,
      };
      newOptions.body = stringify({ ...newOptions.body, token });
    } else {
      // 测试中
      newOptions.headers = {
        Accept: "application/json",
        AUTHORIZATION: token,
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (response.status === 204) {
        return response.text();
      }
      let promisTemp = response.json();
      return promisTemp.then((d) => {
        try {
          // 返回JSON不对直接报错
          // if (isNaN(d.flag)) {
          //   message.error(d.message);
          //   return { message: '返回格式错误' };
          // }
          // 登录失败
          if (d.code === 20001) {
            let loginType = localStorage.getItem("loginType");
            if (loginType === "admin") {
              notification.error({
                message: '登录失效',
                description: '您的登录已过期，请重新登录',
                key: 'LoginError',
                duration: 8,
              });
            }
            utils.removeStore();
            history.push('/login');
            return;
          }
          return d;
        } catch (err) {
          console.error(err);
        }
      });
    })
    .catch(e => {
      message.error('数据加载失败,请刷新重试！', 10)
      if (e.name === 'AbortError') {
        console.log('Fetch aborted,请求被中断');
      } else {
        console.log('Another error');
      }
    });
}
