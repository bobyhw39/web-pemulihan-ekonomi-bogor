import { all, call, put, takeLatest } from "redux-saga/effects";
import * as categoryFaqAction from "../actions/categoryFaq";
import { ResponseGenerator } from "../models/ResponseGenerator";
import {
  deleteCategoryFaq,
  getCategoryFaq,
  postCategoryFaq,
  putCategoryFaq,
} from "../requests/categoryFaq";
import { notificationMessage } from "../utils/notifications";

export function* getCategoryFaqF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getCategoryFaq, action.data);
    let data = response.data;
    yield put({
      type: categoryFaqAction.GET_CATEGORY_FAQ_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: categoryFaqAction.GET_CATEGORY_FAQ_ERROR,
      data: e,
    });
  }
}

export function* insertCategoryFaqF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      postCategoryFaq,
      action.data
    );
    let data = response.data;
    yield put({
      type: categoryFaqAction.INSERT_CATEGORY_FAQ_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: categoryFaqAction.INSERT_CATEGORY_FAQ_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* updateCategoryFaqF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      putCategoryFaq,
      action.data,
      action.id
    );
    let data = response.data;
    yield put({
      type: categoryFaqAction.UPDATE_CATEGORY_FAQ_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: categoryFaqAction.UPDATE_CATEGORY_FAQ_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* deleteCategoryFaqF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      deleteCategoryFaq,
      action.id
    );
    let data = response.data;
    yield put({
      type: categoryFaqAction.UPDATE_CATEGORY_FAQ_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menghapus!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: categoryFaqAction.UPDATE_CATEGORY_FAQ_ERROR,
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
  takeLatest(categoryFaqAction.GET_CATEGORY_FAQ_REQUEST, getCategoryFaqF),
  takeLatest(categoryFaqAction.INSERT_CATEGORY_FAQ_REQUEST, insertCategoryFaqF),
  takeLatest(categoryFaqAction.UPDATE_CATEGORY_FAQ_REQUEST, updateCategoryFaqF),
  takeLatest(categoryFaqAction.DELETE_CATEGORY_FAQ_REQUEST, deleteCategoryFaqF),
]);
