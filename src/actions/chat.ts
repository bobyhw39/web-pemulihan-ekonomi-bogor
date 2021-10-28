import {defaultActionCreator} from ".";

export const GET_ALL_USER_CHAT_REQUEST = 'GET_ALL_USER_CHAT_REQUEST'
export const getAllUserChatRequest = defaultActionCreator(GET_ALL_USER_CHAT_REQUEST, 'data')
export const GET_ALL_USER_CHAT_SUCCESS = 'GET_ALL_USER_CHAT_SUCCESS'
export const getAllUserChatSuccess = defaultActionCreator(GET_ALL_USER_CHAT_SUCCESS, 'data')
export const GET_ALL_USER_CHAT_ERROR = 'GET_ALL_USER_CHAT_ERROR'
export const getAllUserChatError = defaultActionCreator(GET_ALL_USER_CHAT_ERROR, 'data')

export const GET_HISTORY_CHAT_REQUEST = 'GET_HISTORY_CHAT_REQUEST'
export const getHistoryChatRequest = defaultActionCreator(GET_HISTORY_CHAT_REQUEST, 'data')
export const GET_HISTORY_CHAT_SUCCESS = 'GET_HISTORY_CHAT_SUCCESS'
export const getHistoryChatSuccess = defaultActionCreator(GET_HISTORY_CHAT_SUCCESS, 'data')
export const GET_HISTORY_CHAT_ERROR = 'GET_HISTORY_CHAT_ERROR'
export const getHistoryChatError = defaultActionCreator(GET_HISTORY_CHAT_ERROR, 'data')

export const SEND_CHAT_REQUEST = 'SEND_CHAT_REQUEST'
export const sendChatRequest = defaultActionCreator(SEND_CHAT_REQUEST, 'data')
export const SEND_CHAT_SUCCESS = 'SEND_CHAT_SUCCESS'
export const sendChatSuccess = defaultActionCreator(SEND_CHAT_SUCCESS, 'data')
export const SEND_CHAT_ERROR = 'SEND_CHAT_ERROR'
export const sendChatError = defaultActionCreator(SEND_CHAT_ERROR, 'data')


export const CHANGE_STATE_CHAT = 'CHANGE_STATE_CHAT'
export const changeStateChatRequest = defaultActionCreator(CHANGE_STATE_CHAT, 'name','value')

export const GET_ALL_USERS_CHAT_REQUEST = 'GET_ALL_USERS_CHAT_REQUEST'
export const getAllUsersChatRequest = defaultActionCreator(GET_ALL_USERS_CHAT_REQUEST, 'data')
export const GET_ALL_USERS_CHAT_SUCCESS = 'GET_ALL_USERS_CHAT_SUCCESS'
export const getAllUsersChatSuccess = defaultActionCreator(GET_ALL_USERS_CHAT_SUCCESS, 'data')
export const GET_ALL_USERS_CHAT_ERROR = 'GET_ALL_USERS_CHAT_ERROR'
export const getAllUsersChatError = defaultActionCreator(GET_ALL_USERS_CHAT_ERROR, 'data')
