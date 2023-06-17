import { message } from "antd";
import {
  getSKU_square,
  getCartList,
  delCart,
  addCart,
  getColorList,
  getCommentList,
  getSkinsList,
  getWordCloud,
  getSKUCompare,
  getUseWordCloud,
  getSKUDetail,
  getSKUPSR,
  getSKUDownload,
  getSKUSquareDetail,
  getSKUSquareAddSku,
  getSKUSquareSkuSearch,
  getSKUDownloadAll,
  getSKUComment,
  getSKUOrdinaryComment,
  getCommentList1,
  getProductList,
  getSKUDetailList,
  getCommentDetail,
  DelComment,
  getSKUCommentDetail,
  getSKUDetailWordCloud,
  getCommentContent,
  getTranslate,
  getColorShade
} from "../services/sku";

const initData = {
  total: 0,
  page: 1,
  pageSize: 20,
  data: [],
};

export default {
  namespace: "sku",
  state: {
    SKUList: { ...initData },
  },
  effects: {
    // SKU管理
    *fetchSKU_square({ payload }, { call, put }) {
      const response = yield call(getSKU_square, payload);
      if (response.code === 0) {
        yield put({
          type: "querySKUList",
          payload: {
            total: response.data.count,
            data: response.data.data,
            page: payload.page || 1,
            pageSize: payload.pageSize || 20,
          }
        });
      } else {
        message.error(response.message);
      }
    },

  },
  reducers: {
    querySKUList(state, { payload }) {
      return {
        ...state,
        SKUList: payload,
      };
    },
  },
};
