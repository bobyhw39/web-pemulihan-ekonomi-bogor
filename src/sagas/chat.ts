import { all, call, put, takeLatest } from "redux-saga/effects";
import * as chatAction from "../actions/chat";
import { ResponseGenerator } from "../models/RootState";
import { getAllUserChat, getHistoryChat, sendMessage , getAllUsersChat} from "../requests/chat";
import { notificationMessage } from "../utils/notifications";
import { scrollToBottomChat } from "../utils/utils";

export function* getAllUserChatF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getAllUserChat);
    let data = response.data;
    yield put({
      type: chatAction.GET_ALL_USER_CHAT_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: chatAction.GET_ALL_USER_CHAT_ERROR,
      error: e,
      message: "Oups, Error",
    });
    notificationMessage("error", `Ada kesalahan`, ``);
  }
}

export function* getAllUsersF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getAllUsersChat);
    let data = response.data;
    yield put({
      type: chatAction.GET_ALL_USERS_CHAT_SUCCESS,
      data,
    });
  } catch (e: any) {
    yield put({
      type: chatAction.GET_ALL_USERS_CHAT_ERROR,
      error: e,
      message: "Oups, Error",
    });
    notificationMessage("error", `Ada kesalahan`, ``);
  }
}

export function* getHistoryChatF(action: any) {
  try {
    const response: ResponseGenerator = yield call(getHistoryChat, action.data);
    let data = response.data;
    yield put({
      type: chatAction.GET_HISTORY_CHAT_SUCCESS,
      data,
    });
    yield scrollToBottomChat()
  } catch (e: any) {
    yield put({
      type: chatAction.GET_HISTORY_CHAT_ERROR,
      error: e,
      message: "Oups, Error",
    });
    notificationMessage("error", `Ada kesalahan`, ``);
  }
}

export function* sendMessageF(action: any) {
  try {
    let bodyMessage = {
      id: 0,
      content: action.data.content,
      status: "SENT",
      sender: String(localStorage.getItem("user_id")),
      receiver: String(action.data.receiver),
      createdDate: "",
    };
    yield call(sendMessage, action.data);
    yield put({
      type: chatAction.SEND_CHAT_SUCCESS,
      data: bodyMessage,
    });
    yield scrollToBottomChat()

  } catch (e: any) {
      console.log(e);
      
    yield put({
      type: chatAction.SEND_CHAT_ERROR,
      error: e,
      message: "Oups, Error",
    });
    notificationMessage("error", `Ada kesalahan`, ``);
  }
}

export default all([
  takeLatest(chatAction.GET_ALL_USERS_CHAT_REQUEST, getAllUsersF),
  takeLatest(chatAction.GET_ALL_USER_CHAT_REQUEST, getAllUserChatF),
  takeLatest(chatAction.GET_HISTORY_CHAT_REQUEST, getHistoryChatF),
  takeLatest(chatAction.SEND_CHAT_REQUEST, sendMessageF),
]);
