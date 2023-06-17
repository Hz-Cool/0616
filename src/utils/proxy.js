
export const proxyData = process.env.proxyData;
export const msClientId = process.env.msClientId;
export const msAuthority = process.env.msAuthority;
export const msRedirect = process.env.msRedirect;
export const sentryDSN = process.env.sentryDSN;
export const release = process.env.release;

// 解决报错问题
export const getRole = () => {
  let userinfo = JSON.parse(localStorage.getItem("user"));
  return userinfo ? userinfo.role_id : "";
};

