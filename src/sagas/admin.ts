import { all, call, put, takeLatest } from "redux-saga/effects";
import * as adminAction from "../actions/admin";
import { ResponseGenerator } from "../models/ResponseGenerator";
import { deleteAdmin, getAdmin, postAdmin, putAdmin } from "../requests/admin";
import { notificationMessage } from "../utils/notifications";

export function* getAdminF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getAdmin, action.data);
    let data = response.data;
    yield put({
      type: adminAction.GET_ADMIN_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: adminAction.GET_ADMIN_ERROR,
      data: e,
    });
  }
}
export function* insertAdminF(action: any) {
  try {
    const response: ResponseGenerator = yield call(postAdmin, action.data);
    let data = response.data;
    yield put({
      type: adminAction.INSERT_ADMIN_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: adminAction.INSERT_ADMIN_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* updateAdminF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      putAdmin,
      action.data,
      action.id
    );
    let data = response.data;
    yield put({
      type: adminAction.UPDATE_ADMIN_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: adminAction.UPDATE_ADMIN_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* deleteAdminF(action: any) {
  try {
    const response: ResponseGenerator = yield call(deleteAdmin, action.id);
    let data = response.data;
    yield put({
      type: adminAction.UPDATE_ADMIN_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menghapus!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: adminAction.UPDATE_ADMIN_ERROR,
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
  takeLatest(adminAction.GET_ADMIN_REQUEST, getAdminF),
  takeLatest(adminAction.INSERT_ADMIN_REQUEST, insertAdminF),
  takeLatest(adminAction.UPDATE_ADMIN_REQUEST, updateAdminF),
  takeLatest(adminAction.DELETE_ADMIN_REQUEST, deleteAdminF),
]);
