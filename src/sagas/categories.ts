import { all, call, put, takeLatest } from "redux-saga/effects";
import * as categoryActions from "../actions/categories";
import { ResponseGenerator } from "../models/RootState";
import {
  deleteCategory,
  getCategories,
  postCategory,
  putCategory,
} from "../requests/categories";
import { notificationMessage } from "../utils/notifications";

export function* getCategoriesF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getCategories, action.data);
    let data = response.data;
    yield put({
      type: categoryActions.GET_CATEGORIES_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: categoryActions.GET_CATEGORIES_ERROR,
      data: e,
    });
  }
}

export function* insertCategoryF(action: any) {
  try {
    const response: ResponseGenerator = yield call(postCategory, action.data);
    let data = response.data;
    yield put({
      type: categoryActions.INSERT_CATEGORY_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: categoryActions.INSERT_CATEGORY_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* updateCategoryF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      putCategory,
      action.data,
      action.id
    );
    let data = response.data;
    yield put({
      type: categoryActions.UPDATE_CATEGORY_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: categoryActions.UPDATE_CATEGORY_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* deleteCategoryF(action: any) {
  try {
    const response: ResponseGenerator = yield call(deleteCategory, action.id);
    let data = response.data;
    yield put({
      type: categoryActions.UPDATE_CATEGORY_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menghapus!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: categoryActions.UPDATE_CATEGORY_ERROR,
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
  takeLatest(categoryActions.GET_CATEGORIES_REQUEST, getCategoriesF),
  takeLatest(categoryActions.INSERT_CATEGORY_REQUEST, insertCategoryF),
  takeLatest(categoryActions.DELETE_CATEGORY_REQUEST, deleteCategoryF),
  takeLatest(categoryActions.UPDATE_CATEGORY_REQUEST, updateCategoryF),
]);
