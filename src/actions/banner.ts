import {defaultActionCreator} from ".";

export const GET_BANNER_REQUEST = 'GET_BANNER_REQUEST'
export const getBannerRequest = defaultActionCreator(GET_BANNER_REQUEST, )
export const GET_BANNER_SUCCESS = 'GET_BANNER_SUCCESS'
export const getBannerSuccess = defaultActionCreator(GET_BANNER_SUCCESS, 'data')
export const GET_BANNER_ERROR = 'GET_BANNER_ERROR'
export const getBannerError = defaultActionCreator(GET_BANNER_ERROR, 'data')

export const INSERT_BANNER_REQUEST = 'INSERT_BANNER_REQUEST'
export const insertBannerRequest = defaultActionCreator(INSERT_BANNER_REQUEST,'data','func' )
export const INSERT_BANNER_SUCCESS = 'INSERT_BANNER_SUCCESS'
export const insertBannerSuccess = defaultActionCreator(INSERT_BANNER_SUCCESS, 'data')
export const INSERT_BANNER_ERROR = 'INSERT_BANNER_ERROR'
export const insertBannerError = defaultActionCreator(INSERT_BANNER_ERROR, 'data')

export const UPDATE_BANNER_REQUEST = 'UPDATE_BANNER_REQUEST'
export const updateBannerRequest = defaultActionCreator(UPDATE_BANNER_REQUEST,'data','id','func' )
export const UPDATE_BANNER_SUCCESS = 'UPDATE_BANNER_SUCCESS'
export const updateBannerSuccess = defaultActionCreator(UPDATE_BANNER_SUCCESS, 'data')
export const UPDATE_BANNER_ERROR = 'UPDATE_BANNER_ERROR'
export const updateBannerError = defaultActionCreator(UPDATE_BANNER_ERROR, 'data')

export const DELETE_BANNER_REQUEST = 'DELETE_BANNER_REQUEST'
export const deleteBannerRequest = defaultActionCreator(DELETE_BANNER_REQUEST,'id','func' )
export const DELETE_BANNER_SUCCESS = 'DELETE_BANNER_SUCCESS'
export const deleteBannerSuccess = defaultActionCreator(DELETE_BANNER_SUCCESS, 'data')
export const DELETE_BANNER_ERROR = 'DELETE_BANNER_ERROR'
export const deleteBannerError = defaultActionCreator(DELETE_BANNER_ERROR, 'data')
