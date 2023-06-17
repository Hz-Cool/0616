const signalCache = {};
// 创建一个signal
export function newSignal(key) {
  // 用于中断请求,避免数据加载时间过长时，同一接口先请求却后返回数据带来的数据错位问题
  if ("AbortController" in window) {
    signalCache[key + 'Controller'] = new AbortController();
  }
  // console.log("🚀 ~ 加入取下队列", signalCache[key + 'Controller'].signal)
  return signalCache[key + 'Controller'];
}

// 执行abort方法,停止指定key的AbortController
export function stopSignal(key) {
  // console.log("🚀 ~ 开始取消", key)
  if ("AbortController" in window) {
    signalCache[key + 'Controller'] && signalCache[key + 'Controller'].abort();
    delete signalCache[key + 'Controller'];
  }
}
