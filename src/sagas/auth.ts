import { all, call, put, takeLatest } from "redux-saga/effects";
import * as authAction from "../actions/auth";
import { ResponseGenerator } from "../models/RootState";
import { forgotPassword, login, loginAdmin, logout, logoutAdmin, resetPassword } from "../requests/auth";
import history from "../utils/history";
import { notificationMessage } from "../utils/notifications";

export function* postLogin(action: any) {
  try {
    const response: ResponseGenerator = yield call(login, action.data);
    let data = response.data;
    yield put({
      type: authAction.LOGIN_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil`, ``);
    localStorage.setItem("access_token", data.data);
    localStorage.setItem("role", "customer");
    history.push("/");
  } catch (e: any) {
    yield put({
      type: authAction.LOGIN_ERROR,
      error: e,
      message: "Oups, Error",
    });
    
    yield localStorage.removeItem("emailOtp");
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal`,
      e?.response?.data?.responseDescription ||
        `Mohon periksa kembali data yang anda masukan`
    );
  }
}

export function* postLogout(action: any) {
  try {
    const response: ResponseGenerator = yield call(logout, action.data);
    let data = response.data;
    yield put({
      type: authAction.LOGOUT_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasi`, `anda telah keluar`);
    
    localStorage.removeItem("access_token");
    history.push("/login");
  } catch (e: any) {
    yield put({
      type: authAction.LOGOUT_ERROR,
      error: e,
      message: "Oups, Error",
    });
    
    localStorage.removeItem("access_token");
    history.push("/login");
    // notificationMessage("error",`Gagal keluar`,``)
  }
}

export function* forgotPasswordF(action: any) {
  try {
    const response: ResponseGenerator = yield call(forgotPassword, action.data);
    let data = response.data;
    notificationMessage("success", `Berhasil`, `Cek Email`);
    history.push({ pathname: "reset-password", state: true });
  } catch (e: any) {
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal`,
      e?.response?.data?.responseDescription ||
        `Mohon periksa kembali data yang anda masukan`
    );
    history.push({ pathname: "reset-password", state: false });
  }
}
export function* resetPasswordF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      resetPassword,
      action.data,
      action.id
    );
    let data = response.data;
    notificationMessage("success", `Berhasil`, `diubah`);
    history.push({ pathname: "reset-password", state: true });
  } catch (e: any) {
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal`,
      e?.response?.data?.responseDescription ||
        `Mohon periksa kembali data yang anda masukan`
    );
  }
}

export function* postLoginAdmin(action: any) {
  try {
    const response: ResponseGenerator = yield call(loginAdmin, action.data);
    let data = response.data;
    localStorage.setItem("role", "admin");
    localStorage.setItem("admin_access_token", data.data);
    yield put({
      type: authAction.LOGIN_ADMIN_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil`, ``);
    history.push("/dashboard-admin");
  } catch (e: any) {
    yield put({
      type: authAction.LOGIN_ADMIN_ERROR,
      error: e,
      message: "Oups, Error",
    });
    
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal`,
      e?.response?.data?.responseDescription ||
        `Mohon periksa kembali data yang anda masukan`
    );
  }
}

export function* postLogoutAdmin(action: any) {
  try {
    const response: ResponseGenerator = yield call(logoutAdmin, action.data);
    let data = response.data;
    yield put({
      type: authAction.LOGOUT_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasi`, `anda telah keluar`);
    
    localStorage.removeItem("admin_access_token");
    history.push("/login");
  } catch (e: any) {
    yield put({
      type: authAction.LOGOUT_ERROR,
      error: e,
      message: "Oups, Error",
    });
    
    localStorage.removeItem("admin_access_token");
    history.push("/admin-login");
    // notificationMessage("error",`Gagal keluar`,``)
  }
}
export default all([
  takeLatest(authAction.RESET_PASSWORD_REQUEST, resetPasswordF),
  takeLatest(authAction.FORGOT_PASSWORD_REQUEST, forgotPasswordF),
  takeLatest(authAction.LOGOUT_REQUEST, postLogout),
  takeLatest(authAction.LOGIN_REQUEST, postLogin),
  takeLatest(authAction.LOGOUT_ADMIN_REQUEST, postLogoutAdmin),
  takeLatest(authAction.LOGIN_ADMIN_REQUEST, postLoginAdmin),
]);
