import { all, call, put, takeLatest } from "redux-saga/effects";
import * as dashboardAction from "../actions/dashboard";
import { ResponseGenerator } from "../models/ResponseGenerator";
import { getVisitCount } from "../requests/dashboard";

export function* getVisitCountF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getVisitCount, action.data);
    let data = response.data;
    yield put({
      type: dashboardAction.VISIT_COUNT_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: dashboardAction.VISIT_COUNT_ERROR,
      error: e,
      message: "Oups, Error",
    });
  }
}

export default all([
  takeLatest(dashboardAction.VISIT_COUNT_REQUEST, getVisitCountF),
]);
