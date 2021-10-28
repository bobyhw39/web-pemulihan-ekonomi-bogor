import { all, call, put, takeLatest } from "redux-saga/effects";
import * as productAction from "../actions/product";
import { ResponseGenerator } from "../models/RootState";
import {
  deleteProduct,
  getProduct,
  getProductCount,
  getProductId,
  postProduct,
  putProduct,
} from "../requests/product";
import { notificationMessage } from "../utils/notifications";

export function* postProductF(action: any) {
  try {
    const response: ResponseGenerator = yield call(postProduct, action.data);
    let data = response.data;
    yield put({
      type: productAction.POST_PRODUCT_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasi`, `data telah disimpan`);
    yield action.func();
  } catch (e: any) {
    yield put({
      type: productAction.POST_PRODUCT_ERROR,
      data: e,
    });

    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}

export function* getProductCountF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      getProductCount,
      action.data
    );
    let data = response.data;
    yield put({
      type: productAction.GET_PRODUCT_BY_COUNT_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: productAction.GET_PRODUCT_BY_COUNT_ERROR,
      data: e,
    });
  }
}

export function* getProductF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getProduct, action.data);
    let data = response.data;
    yield put({
      type: productAction.GET_PRODUCT_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: productAction.GET_PRODUCT_ERROR,
      data: e,
    });
  }
}

export function* getProductSearchF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getProduct, action.data);
    let data = response.data;
    yield put({
      type: productAction.GET_PRODUCT_SEARCH_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: productAction.GET_PRODUCT_SEARCH_ERROR,
      data: e,
    });
  }
}
export function* getProductIdF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getProductId, action.data);
    let data = response.data;
    yield put({
      type: productAction.GET_PRODUCT_BY_ID_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: productAction.GET_PRODUCT_BY_ID_ERROR,
      data: e,
    });
  }
}

export function* editProductF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      putProduct,
      action.data,
      action.id
    );
    let data = response.data;
    yield put({
      type: productAction.EDIT_PRODUCT_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasi`, `data telah disimpan`);
    yield action.func();
  } catch (e: any) {
    yield put({
      type: productAction.EDIT_PRODUCT_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}

export function* deleteProductF(action: any) {
  try {
    const response: ResponseGenerator = yield call(deleteProduct, action.id);
    let data = response.data;
    yield put({
      type: productAction.DELETE_PRODUCT_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasi`, `data telah dihapus`);
    yield action.func();
  } catch (e: any) {
    yield put({
      type: productAction.DELETE_PRODUCT_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menghapus`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}

export default all([
  takeLatest(productAction.DELETE_PRODUCT_REQUEST, deleteProductF),
  takeLatest(productAction.EDIT_PRODUCT_REQUEST, editProductF),
  takeLatest(productAction.POST_PRODUCT_REQUEST, postProductF),
  takeLatest(productAction.GET_PRODUCT_SEARCH_REQUEST, getProductSearchF),
  takeLatest(productAction.GET_PRODUCT_REQUEST, getProductF),
  takeLatest(productAction.GET_PRODUCT_BY_COUNT_REQUEST, getProductCountF),
  takeLatest(productAction.GET_PRODUCT_BY_ID_REQUEST, getProductIdF),
]);
