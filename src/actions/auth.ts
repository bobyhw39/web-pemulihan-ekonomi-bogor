import { defaultActionCreator } from ".";

export const SET_FORM_AUTH = "SET_FORM_AUTH";
export const setFormAuth = defaultActionCreator(SET_FORM_AUTH, "name", "value");

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const loginRequest = defaultActionCreator(LOGIN_REQUEST, "data");
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = defaultActionCreator(LOGIN_SUCCESS, "data");
export const LOGIN_ERROR = "LOGIN_ERROR";
export const loginError = defaultActionCreator(LOGIN_ERROR, "data");

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LogoutRequest = defaultActionCreator(LOGOUT_REQUEST, "data");
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LogoutSuccess = defaultActionCreator(LOGOUT_SUCCESS, "data");
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const LogoutError = defaultActionCreator(LOGOUT_ERROR, "data");

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const forgotPasswordRequest = defaultActionCreator(
  FORGOT_PASSWORD_REQUEST,
  "data",
  "func"
);
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const forgotPasswordSuccess = defaultActionCreator(
  FORGOT_PASSWORD_SUCCESS,
  "data"
);
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";
export const forgotPasswordError = defaultActionCreator(
  FORGOT_PASSWORD_ERROR,
  "data"
);

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const resetPasswordRequest = defaultActionCreator(
  RESET_PASSWORD_REQUEST,
  "data",
  "id",
);
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const resetPasswordSuccess = defaultActionCreator(
  RESET_PASSWORD_SUCCESS,
  "data"
);
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const resetPasswordError = defaultActionCreator(
  RESET_PASSWORD_ERROR,
  "data"
);


export const LOGIN_ADMIN_REQUEST = "LOGIN_ADMIN_REQUEST";
export const loginAdminRequest = defaultActionCreator(LOGIN_ADMIN_REQUEST, "data");
export const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
export const loginAdminSuccess = defaultActionCreator(LOGIN_ADMIN_SUCCESS, "data");
export const LOGIN_ADMIN_ERROR = "LOGIN_ADMIN_ERROR";
export const loginAdminError = defaultActionCreator(LOGIN_ADMIN_ERROR, "data");

export const LOGOUT_ADMIN_REQUEST = "LOGOUT_ADMIN_REQUEST";
export const LogoutAdminRequest = defaultActionCreator(LOGOUT_ADMIN_REQUEST, "data");
export const LOGOUT_ADMIN_SUCCESS = "LOGOUT_ADMIN_SUCCESS";
export const LogoutAdminSuccess = defaultActionCreator(LOGOUT_ADMIN_SUCCESS, "data");
export const LOGOUT_ADMIN_ERROR = "LOGOUT_ADMIN_ERROR";
export const LogoutAdminError = defaultActionCreator(LOGOUT_ADMIN_ERROR, "data");
