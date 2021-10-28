import {defaultActionCreator} from ".";

export const GET_FAQ_REQUEST = 'GET_FAQ_REQUEST'
export const getFaqRequest = defaultActionCreator(GET_FAQ_REQUEST, 'data')
export const GET_FAQ_SUCCESS = 'GET_FAQ_SUCCESS'
export const getFaqSuccess = defaultActionCreator(GET_FAQ_SUCCESS, 'data')
export const GET_FAQ_ERROR = 'GET_FAQ_ERROR'
export const getFaqError = defaultActionCreator(GET_FAQ_ERROR, 'data')

export const INSERT_FAQ_REQUEST = 'INSERT_FAQ_REQUEST'
export const insertFaqRequest = defaultActionCreator(INSERT_FAQ_REQUEST,'data','func' )
export const INSERT_FAQ_SUCCESS = 'INSERT_FAQ_SUCCESS'
export const insertFaqSuccess = defaultActionCreator(INSERT_FAQ_SUCCESS, 'data')
export const INSERT_FAQ_ERROR = 'INSERT_FAQ_ERROR'
export const insertFaqError = defaultActionCreator(INSERT_FAQ_ERROR, 'data')

export const UPDATE_FAQ_REQUEST = 'UPDATE_FAQ_REQUEST'
export const updateFaqRequest = defaultActionCreator(UPDATE_FAQ_REQUEST,'data','id','func' )
export const UPDATE_FAQ_SUCCESS = 'UPDATE_FAQ_SUCCESS'
export const updateFaqSuccess = defaultActionCreator(UPDATE_FAQ_SUCCESS, 'data')
export const UPDATE_FAQ_ERROR = 'UPDATE_FAQ_ERROR'
export const updateFaqError = defaultActionCreator(UPDATE_FAQ_ERROR, 'data')

export const DELETE_FAQ_REQUEST = 'DELETE_FAQ_REQUEST'
export const deleteFaqRequest = defaultActionCreator(DELETE_FAQ_REQUEST,'id','func' )
export const DELETE_FAQ_SUCCESS = 'DELETE_FAQ_SUCCESS'
export const deleteFaqSuccess = defaultActionCreator(DELETE_FAQ_SUCCESS, 'data')
export const DELETE_FAQ_ERROR = 'DELETE_FAQ_ERROR'
export const deleteFaqError = defaultActionCreator(DELETE_FAQ_ERROR, 'data')
