import request from '../utils/request';
import { stringify } from 'qs';
import { proxyData } from '@/utils/proxy';

// 登录
export async function getLogin(params) {
  return request(`${proxyData}/admin/user/login`, {
    body: params,
    method: 'POST',
  })
}

// 登出
export async function getLogout(params) {
  return request(`${proxyData}/admin/user/logout`, {
    method: 'POST',
  })
}

// Azure登录
export async function getAzureLogin(params) {
  return request(`${proxyData}/admin/user/azure_login`, {
    body: params,
    method: 'POST',
  })
}
