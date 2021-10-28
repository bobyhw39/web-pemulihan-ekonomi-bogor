import { defaultActionCreator } from ".";

export const SET_STATE_DASHBOARD = "SET_STATE_DASHBOARD";
export const setStateDashboard = defaultActionCreator(SET_STATE_DASHBOARD, "name", "value");

export const VISIT_COUNT_REQUEST = "VISIT_COUNT_REQUEST";
export const visitCountRequest = defaultActionCreator(
  VISIT_COUNT_REQUEST,
  "data"
);
export const VISIT_COUNT_SUCCESS = "VISIT_COUNT_SUCCESS";
export const visitCountSuccess = defaultActionCreator(
  VISIT_COUNT_SUCCESS,
  "data"
);
export const VISIT_COUNT_ERROR = "VISIT_COUNT_ERROR";
export const visitCountError = defaultActionCreator(VISIT_COUNT_ERROR, "data");
