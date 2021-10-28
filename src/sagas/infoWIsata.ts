import { all, call, put, takeLatest } from "redux-saga/effects";
import * as infoWisataAction from "../actions/infoWisata";
import { ResponseGenerator } from "../models/RootState";
import {
  deleteInfoWisata,
  getInfoWisata,
  getInfoWisataById,
  postInfoWisata,
  putInfoWisata,
} from "../requests/infoWisata";
import { notificationMessage } from "../utils/notifications";

export function* getInfoWisataF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getInfoWisata, action.data);
    let data = response.data;
    yield put({
      type: infoWisataAction.GET_INFO_WISATA_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: infoWisataAction.GET_INFO_WISATA_ERROR,
      data: e,
    });
  }
}
export function* getInfoWisataByIdF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      getInfoWisataById,
      action.data
    );
    let data = response.data;
    yield put({
      type: infoWisataAction.GET_INFO_WISATA_BY_ID_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: infoWisataAction.GET_INFO_WISATA_BY_ID_ERROR,
      data: e,
    });
  }
}
export function* insertInfoWisataF(action: any) {
  try {
    const response: ResponseGenerator = yield call(postInfoWisata, action.data);
    let data = response.data;
    yield put({
      type: infoWisataAction.INSERT_INFO_WISATA_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: infoWisataAction.INSERT_INFO_WISATA_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* updateInfoWisataF(action: any) {
  try {
    const response: ResponseGenerator = yield call(
      putInfoWisata,
      action.data,
      action.id
    );
    let data = response.data;
    yield put({
      type: infoWisataAction.UPDATE_INFO_WISATA_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menyimpan!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: infoWisataAction.UPDATE_INFO_WISATA_ERROR,
      data: e,
    });
    notificationMessage(
      "error",
      e?.response?.data?.message || `Gagal menyimpan`,
      e?.response?.data?.responseDescription || `coba beberapa saat lagi`
    );
  }
}
export function* deleteInfoWisataF(action: any) {
  try {
    const response: ResponseGenerator = yield call(deleteInfoWisata, action.id);
    let data = response.data;
    yield put({
      type: infoWisataAction.UPDATE_INFO_WISATA_SUCCESS,
      data,
    });
    notificationMessage("success", `Berhasil menghapus!`, ``);
    action.func();
  } catch (e: any) {
    yield put({
      type: infoWisataAction.UPDATE_INFO_WISATA_ERROR,
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
  takeLatest(infoWisataAction.GET_INFO_WISATA_REQUEST, getInfoWisataF),
  takeLatest(
    infoWisataAction.GET_INFO_WISATA_BY_ID_REQUEST,
    getInfoWisataByIdF
  ),
  takeLatest(infoWisataAction.INSERT_INFO_WISATA_REQUEST, insertInfoWisataF),
  takeLatest(infoWisataAction.UPDATE_INFO_WISATA_REQUEST, updateInfoWisataF),
  takeLatest(infoWisataAction.DELETE_INFO_WISATA_REQUEST, deleteInfoWisataF),
]);
