import {defaultActionCreator} from ".";

export const GET_ADMIN_REQUEST = 'GET_ADMIN_REQUEST'
export const getAdminRequest = defaultActionCreator(GET_ADMIN_REQUEST,'data' )
export const GET_ADMIN_SUCCESS = 'GET_ADMIN_SUCCESS'
export const getAdminSuccess = defaultActionCreator(GET_ADMIN_SUCCESS, 'data')
export const GET_ADMIN_ERROR = 'GET_ADMIN_ERROR'
export const getAdminError = defaultActionCreator(GET_ADMIN_ERROR, 'data')

export const INSERT_ADMIN_REQUEST = 'INSERT_ADMIN_REQUEST'
export const insertAdminRequest = defaultActionCreator(INSERT_ADMIN_REQUEST,'data','func' )
export const INSERT_ADMIN_SUCCESS = 'INSERT_ADMIN_SUCCESS'
export const insertAdminSuccess = defaultActionCreator(INSERT_ADMIN_SUCCESS, 'data')
export const INSERT_ADMIN_ERROR = 'INSERT_ADMIN_ERROR'
export const insertAdminError = defaultActionCreator(INSERT_ADMIN_ERROR, 'data')

export const UPDATE_ADMIN_REQUEST = 'UPDATE_ADMIN_REQUEST'
export const updateAdminRequest = defaultActionCreator(UPDATE_ADMIN_REQUEST,'data','id','func' )
export const UPDATE_ADMIN_SUCCESS = 'UPDATE_ADMIN_SUCCESS'
export const updateAdminSuccess = defaultActionCreator(UPDATE_ADMIN_SUCCESS, 'data')
export const UPDATE_ADMIN_ERROR = 'UPDATE_ADMIN_ERROR'
export const updateAdminError = defaultActionCreator(UPDATE_ADMIN_ERROR, 'data')

export const DELETE_ADMIN_REQUEST = 'DELETE_ADMIN_REQUEST'
export const deleteAdminRequest = defaultActionCreator(DELETE_ADMIN_REQUEST,'id','func' )
export const DELETE_ADMIN_SUCCESS = 'DELETE_ADMIN_SUCCESS'
export const deleteAdminSuccess = defaultActionCreator(DELETE_ADMIN_SUCCESS, 'data')
export const DELETE_ADMIN_ERROR = 'DELETE_ADMIN_ERROR'
export const deleteAdminError = defaultActionCreator(DELETE_ADMIN_ERROR, 'data')
