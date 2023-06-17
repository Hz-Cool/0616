import { proxyData } from "@/utils/proxy";
import { message } from "antd";
import { stringify } from "qs";
import moment from "moment";
import { zoom } from "src/utils/globalConst";

const end = '2023-03-01';
/**
 *
 * @param {*} data 千分位数值
 * @param {*} toFixed 保留小数 默认两位
 * @param {*} isZeroTONull 为0时是否返回null 默认否
 */
function Thousands(data, toFixed = 2, isZeroTONull = false) {
  if (isNaN(data)) {
    return null;
  }
  if (data === null || data === "" || data === undefined) {
    return null;
  }
  if (Number(data) === 0) {
    if (isZeroTONull) {
      return null;
    } else {
      return "0";
    }
  }
  if (typeof data === "string") {
    data = Number(data);
  }
  if (toFixed === 0) {
    return data.toLocaleString();
  }
  return data.toFixed(toFixed).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

/**
 * 处理翻页参数
 * 第一页十条 则 (1,20)
 * 被处理成:
 * limit=pagesize
 * offset=pagesize*(page-1)
 * @param {*} page 第N页
 * @param {*} pagesize 一页N条
 */
function handlePageParam(page = 1, pageSize = 20) {
  return {
    limit: pageSize,
    offset: pageSize * (page - 1),
    page,
    pageSize,
  };
}

/**
 * 文件上传
 * @param {*} name 文件名称
 * @param {*} url 访问地址
 */
function exportFilePublic(name = "文件名称", url, data = {}, callback) {
  const token = localStorage.getItem("token");

  let xmlResquest = new XMLHttpRequest();

  xmlResquest.open("POST", proxyData + url, true);
  xmlResquest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=utf-8"
  );
  xmlResquest.responseType = "blob"; // 区分流  和字符的区别

  xmlResquest.onload = function () {
    let content = null;
    // 另一只种方法
    let reader = new FileReader(); // 挂载
    reader.onload = (e) => {
      try {
        let res = JSON.parse(e.target.result);
        message.error(res.message);
        if (callback) {
          callback();
        }
        return;
      } catch (err) {
        content = xmlResquest.response;
        let elink = document.createElement("a");
        elink.download = name + ".xlsx";
        elink.style.display = "none";
        let blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, name + ".xlsx");
        } else {
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          document.body.removeChild(elink);
        }
        if (callback) {
          callback();
        }
      }
    };
    // readAsText 方法是异步的 必须要挂载 实例下的 onload 或 onloadend 的方法处理转化后的结果
    reader.readAsText(xmlResquest.response);
  };

  xmlResquest.send(`${stringify({ ...data, token })}`);
  xmlResquest.onerror = () => {
    if (callback) {
      callback();
    }
    message.error("下载文件错误！");
  };
}

/**
 *
 * @param {*} file
 */
function uploadFile(file, url, callback) {
  console.log("🚀 ~ uploadFile ~ file, url", file, url);
  const token = localStorage.getItem("token");
  let formData = new FormData();
  formData.append("file", file);
  formData.append("token", token);

  let xhr = new XMLHttpRequest();
  // 处理成功
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        let response = JSON.parse(xhr.response);
        if (response.code === 0 && callback) {
          callback(response);
        }
      } catch (err) {
        message.error(err);
      }
    } else {
    }
  };

  // 处理错误
  xhr.onerror = () => {
    message.error("上传失败", 2);
  };
  // 传输方式、url、是否异步
  xhr.open("POST", proxyData + url, true);
  // 发送请求
  xhr.send(formData);
}

/**
 * 获取上一月开始和结束
 * @param {*} format 格式化
 */
function getPreMonthsStartEnd(format) {
  let array = [
    moment(end).subtract(1, "months").startOf("month"),
    moment(end).subtract(1, "months").endOf("month"),
  ];
  // 返回格式化的
  if (format) {
    return array.map((d) => d.format(format));
  }
  return array; // 返回正常
}

/**
 * 获取上12个月开始和结束
 * @param {*} format 格式化
 */
// function getPreYearStartEnd(format) {
//   let array = [
//     moment(end).subtract(12, "months").startOf("month"),
//     moment(end).subtract(1, "months").endOf("month"),
//   ];
//   // 返回格式化的
//   if (format) {
//     return array.map((d) => d.format(format));
//   }
//   return array; // 返回正常
// }

function getWordCloud(data) {
  if (!data.text) {
    data.text = " ";
  }
  return fetch("https://wordcloud.tarsocial.com/ec/wordcloud", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

/**
 * 百分位化 自动四舍五入
 * @param {*} data 数据
 * @param {*} toFixed 保留小数位
 * @returns
 */
function Percentage(data, toFixed = 0) {
  if (data === null || data === "" || data === undefined) {
    return null;
  }
  if (typeof data === "string") {
    data = Number(data);
  }
  let tmp = (Number(data) * 100).toFixed(toFixed);
  return tmp + " %";
}

/**
 * 转换时间
 * @param {*} format 格式化
 */
function getFormatMonthDate(date = [], format) {
  let array = [];
  if (date.length === 0) {
    array = [moment().startOf("month"), moment().endOf("month")];
  } else {
    array = [moment(date[0]).startOf("month"), moment(date[1]).endOf("month")];
  }
  // 返回格式化的
  if (format) {
    return array.map((d) => d.format(format));
  }
  return array; // 返回正常
}

function getColor(data) {
  if (!data) return;
  const { psr, compare } = data;
  // 浅绿AFD376 浅红#E9CDC8
  // psr 大于 category psr 标浅绿，小于 category psr 标浅红
  if (Number(psr) === Number(compare)) {
    return { background: "#E7D996", color: "#000", borderRadius: 50 };
  } else if (Number(psr) > Number(compare)) {
    return { background: "#AFD376", color: "#000", borderRadius: 50 };
  } else {
    return { background: "#E9CDC8", color: "#000", borderRadius: 50 };
  }

}

/**
 * JSON转URL参数
 * @returns
 */
function GetUrlTranJson() {
  let url = location.href; // 获取当前浏览器的URL
  let param = {}; // 存储最终JSON结果对象
  url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
    param[v] = decodeURIComponent(k); // 解析字符为中文
    return k + "=" + v;
  });
  return param;
}

/**
 * URL转JSON参数
 * @param {*} data
 * @returns
 */
function JsonTranGetUrl(data) {
  return Object.keys(data)
    .map(function (key) {
      // body...
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    })
    .join("&");
}

/**
 * 获取月的最后一天
 * @param {*} date
 */
function getMonthEndDay(date) {
  return moment(date).endOf('month')
}

/**
 * 获取月的第一天
 * @param {*} date
 */
function getMonthStartDay(date) {
  return moment(date).startOf('month')
}

/**
 * 是否是苹果
 * @returns
 */
function isMac() {
  return true;
  let ua = navigator.userAgent;
  if (ua.indexOf("Mac") === -1) {
    return false;
  } else {
    return true;
  }
}

/**
 * 系统缩放比 兼容
 */
function zoomScreen() {
  // 系统缩放比
  let pr = window.devicePixelRatio;
  let size = 1;
  let zoomNumber = size / pr;
  if (isMac()) {
    return 1;
  } else {
    return zoomNumber;
  }
  // document.body.style.zoom = zoomNumber;
}

function noZoomScreen() {

}

/**
 * 近N个月
 * @param {*} n
 * @param {*} format 格式化
 * @returns
 */
function MonthTO(n, format) {
  let array = [
    moment(end).subtract(n, "months").startOf("month"),
    moment(end).subtract(1, "months").endOf("month")
  ]
  if (format) {
    array = array.map((d) => d.format(format));
  }
  return array;
}

/**
 * N天前 到 昨天
 * @param {*} n
 * @param {*} format
 * @returns
 */
function subtract_N(n, format) {
  let array = [
    moment().subtract(n, "days"),
    moment().subtract(1, "days"),
  ];
  if (format) {
    array = array.map((d) => d.format(format));
  }
  return array;
}

/**
 * 保存页面参数到localStorage，键名为url名称
 * @param {*} props 1
 * @param {*} payload 保存的参数
 */
function setPagePrame(props, payload) {
  // console.log(`key:${props.location.pathname},value:${payload}`)
  localStorage.setItem(`${props.location.pathname}`, JSON.stringify(payload));
}

/**
 * 获取参数
 * @param {*} props
 * @returns
 */
function getPagePrame(props) {
  let data = localStorage.getItem(`${props.location.pathname}`) || null;
  if (!data) {
    return {};
  }
  return JSON.parse(data);
}

function removePagePrame(props) {
  localStorage.removeItem(`${props.location.pathname}`);
}

function removeStore() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('prompt');
}

export default {
  Thousands: (data, toFixed, isZeroTONull) =>
    Thousands(data, toFixed, isZeroTONull),
  handlePageParam: (page, pageSize) => handlePageParam(page, pageSize),
  exportFilePublic: (name, url, data, callback) =>
    exportFilePublic(name, url, data, callback),
  uploadFile: (file, url, callback) => uploadFile(file, url, callback),
  getPreMonthsStartEnd: (format) => getPreMonthsStartEnd(format),
  getWordCloud: (data) => getWordCloud(data),
  Percentage: (data, toFixed) => Percentage(data, toFixed),
  getFormatMonthDate: (date, format) => getFormatMonthDate(date, format),
  getColor: (data) => getColor(data),
  // getPreYearStartEnd: (format) => getPreYearStartEnd(format),
  GetUrlTranJson: () => GetUrlTranJson(),
  JsonTranGetUrl: (data) => JsonTranGetUrl(data),
  getMonthEndDay: (date) => getMonthEndDay(date),
  getMonthStartDay: (date) => getMonthStartDay(date),
  zoomScreen: () => zoomScreen(),
  isMac: () => isMac(),
  MonthTO: (n, format) => MonthTO(n, format),
  subtract_N: (n, format) => subtract_N(n, format),
  setPagePrame: (props, payload) => setPagePrame(props, payload),
  getPagePrame: (props) => getPagePrame(props),
  removePagePrame: (props) => removePagePrame(props),
  removeStore: () => removeStore(),
  end: () => end
};
