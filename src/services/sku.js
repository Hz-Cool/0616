import request from "../utils/request";
import { stringify } from "qs";
import { proxyData, getRole } from "@/utils/proxy";

function checkURL() {
  return [1, 2].indexOf(getRole()) > -1;
}

export async function getSKU_square(params) {
  let url = checkURL()
    ? "/admin/sku_square_admin/list"
    : "/admin/sku_square/list";
  return request(`${proxyData}${url}`, {
    method: "POST",
    body: params,
  });
}

export async function getCartList(params) {
  return request(`${proxyData}/admin/cart_admin/list`, {
    method: "POST",
    body: params,
  });
}

export async function delCart(params) {
  return request(`${proxyData}/admin/cart_admin/delete`, {
    method: "POST",
    body: params,
  });
}

