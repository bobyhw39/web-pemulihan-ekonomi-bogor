import { all, call, put, takeLatest } from "redux-saga/effects";
import * as faqAction from "../actions/faq";
import { ResponseGenerator } from "../models/RootState";
import { deleteFaq, getFaq, postFaq, putFaq } from "../requests/faq";
import { notificationMessage } from "../utils/notifications";

export function* getFaqF(action:any) {
  try {
    const response: ResponseGenerator = yield call(getFaq,action.data);
    let data = response.data;
    yield put({
      type: faqAction.GET_FAQ_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: faqAction.GET_FAQ_ERROR,
      data: e,
    });
  }
}

export function* insertFaqF(action: any) {
  try {
    const response: ResponseGenerator = yield call(postFaq, action.data);
    let data = response.data;
    yield put({
      type: faqAction.INSERT_FAQ_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: faqAction.INSERT_FAQ_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* updateFaqF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      putFaq,
      action.data,
      action.id
    );
    let data = response.data;
    yield put({
      type: faqAction.UPDATE_FAQ_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: faqAction.UPDATE_FAQ_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* deleteFaqF(action: any) {
  try {
    const response: ResponseGenerator = yield call(deleteFaq, action.id);
    let data = response.data;
    yield put({
      type: faqAction.UPDATE_FAQ_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menghapus!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: faqAction.UPDATE_FAQ_ERROR,
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
  takeLatest(faqAction.GET_FAQ_REQUEST, getFaqF),
  takeLatest(faqAction.INSERT_FAQ_REQUEST, insertFaqF),
  takeLatest(faqAction.UPDATE_FAQ_REQUEST, updateFaqF),
  takeLatest(faqAction.DELETE_FAQ_REQUEST, deleteFaqF),
]);
