import {defaultActionCreator} from ".";

export const GET_CATEGORY_FAQ_REQUEST = 'GET_CATEGORY_FAQ_REQUEST'
export const getCategoryFaqRequest = defaultActionCreator(GET_CATEGORY_FAQ_REQUEST, 'data')
export const GET_CATEGORY_FAQ_SUCCESS = 'GET_CATEGORY_FAQ_SUCCESS'
export const getCategoryFaqSuccess = defaultActionCreator(GET_CATEGORY_FAQ_SUCCESS, 'data')
export const GET_CATEGORY_FAQ_ERROR = 'GET_CATEGORY_FAQ_ERROR'
export const getCategoryFaqError = defaultActionCreator(GET_CATEGORY_FAQ_ERROR, 'data')

export const INSERT_CATEGORY_FAQ_REQUEST = 'INSERT_CATEGORY_FAQ_REQUEST'
export const insertCategoryFaqRequest = defaultActionCreator(INSERT_CATEGORY_FAQ_REQUEST,'data','func' )
export const INSERT_CATEGORY_FAQ_SUCCESS = 'INSERT_CATEGORY_FAQ_SUCCESS'
export const insertCategoryFaqSuccess = defaultActionCreator(INSERT_CATEGORY_FAQ_SUCCESS, 'data')
export const INSERT_CATEGORY_FAQ_ERROR = 'INSERT_CATEGORY_FAQ_ERROR'
export const insertCategoryFaqError = defaultActionCreator(INSERT_CATEGORY_FAQ_ERROR, 'data')

export const UPDATE_CATEGORY_FAQ_REQUEST = 'UPDATE_CATEGORY_FAQ_REQUEST'
export const updateCategoryFaqRequest = defaultActionCreator(UPDATE_CATEGORY_FAQ_REQUEST,'data','id','func' )
export const UPDATE_CATEGORY_FAQ_SUCCESS = 'UPDATE_CATEGORY_FAQ_SUCCESS'
export const updateCategoryFaqSuccess = defaultActionCreator(UPDATE_CATEGORY_FAQ_SUCCESS, 'data')
export const UPDATE_CATEGORY_FAQ_ERROR = 'UPDATE_CATEGORY_FAQ_ERROR'
export const updateCategoryFaqError = defaultActionCreator(UPDATE_CATEGORY_FAQ_ERROR, 'data')

export const DELETE_CATEGORY_FAQ_REQUEST = 'DELETE_CATEGORY_FAQ_REQUEST'
export const deleteCategoryFaqRequest = defaultActionCreator(DELETE_CATEGORY_FAQ_REQUEST,'id','func' )
export const DELETE_CATEGORY_FAQ_SUCCESS = 'DELETE_CATEGORY_FAQ_SUCCESS'
export const deleteCategoryFaqSuccess = defaultActionCreator(DELETE_CATEGORY_FAQ_SUCCESS, 'data')
export const DELETE_CATEGORY_FAQ_ERROR = 'DELETE_CATEGORY_FAQ_ERROR'
export const deleteCategoryFaqError = defaultActionCreator(DELETE_CATEGORY_FAQ_ERROR, 'data')
