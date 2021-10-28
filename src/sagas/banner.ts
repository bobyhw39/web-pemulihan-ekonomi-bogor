import { all, call, put, takeLatest } from "redux-saga/effects";
import * as bannerAction from "../actions/banner";
import { ResponseGenerator } from "../models/RootState";
import { deleteBanner, getBanner, postBanner, putBanner } from "../requests/banner";
import { notificationMessage } from "../utils/notifications";

export function* getBannerF() {
  try {
    const response: ResponseGenerator = yield call(getBanner);
    let data = response.data;
    yield put({
      type: bannerAction.GET_BANNER_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: bannerAction.GET_BANNER_ERROR,
      data: e,
    });
  }
}
export function* insertBannerF(action: any) {
  try {
    const response: ResponseGenerator = yield call(postBanner, action.data);
    let data = response.data;
    yield put({
      type: bannerAction.INSERT_BANNER_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: bannerAction.INSERT_BANNER_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* updateBannerF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      putBanner,
      action.data,
      action.id
    );
    let data = response.data;
    yield put({
      type: bannerAction.UPDATE_BANNER_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: bannerAction.UPDATE_BANNER_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* deleteBannerF(action: any) {
  try {
    const response: ResponseGenerator = yield call(deleteBanner, action.id);
    let data = response.data;
    yield put({
      type: bannerAction.UPDATE_BANNER_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menghapus!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: bannerAction.UPDATE_BANNER_ERROR,
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
  takeLatest(bannerAction.GET_BANNER_REQUEST, getBannerF),
  takeLatest(bannerAction.INSERT_BANNER_REQUEST, insertBannerF),
  takeLatest(bannerAction.UPDATE_BANNER_REQUEST, updateBannerF),
  takeLatest(bannerAction.DELETE_BANNER_REQUEST, deleteBannerF),
]);
