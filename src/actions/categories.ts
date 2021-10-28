import {defaultActionCreator} from ".";

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST'
export const getCategoriesRequest = defaultActionCreator(GET_CATEGORIES_REQUEST, 'data')
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const getCategoriesSuccess = defaultActionCreator(GET_CATEGORIES_SUCCESS, 'data')
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR'
export const getCategoriesError = defaultActionCreator(GET_CATEGORIES_ERROR, 'data')

export const INSERT_CATEGORY_REQUEST = 'INSERT_CATEGORY_REQUEST'
export const insertCategoryRequest = defaultActionCreator(INSERT_CATEGORY_REQUEST,'data','func' )
export const INSERT_CATEGORY_SUCCESS = 'INSERT_CATEGORY_SUCCESS'
export const insertCategorySuccess = defaultActionCreator(INSERT_CATEGORY_SUCCESS, 'data')
export const INSERT_CATEGORY_ERROR = 'INSERT_CATEGORY_ERROR'
export const insertCategoryError = defaultActionCreator(INSERT_CATEGORY_ERROR, 'data')

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST'
export const updateCategoryRequest = defaultActionCreator(UPDATE_CATEGORY_REQUEST,'data','id','func' )
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS'
export const updateCategorySuccess = defaultActionCreator(UPDATE_CATEGORY_SUCCESS, 'data')
export const UPDATE_CATEGORY_ERROR = 'UPDATE_CATEGORY_ERROR'
export const updateCategoryError = defaultActionCreator(UPDATE_CATEGORY_ERROR, 'data')

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST'
export const deleteCategoryRequest = defaultActionCreator(DELETE_CATEGORY_REQUEST,'id','func' )
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS'
export const deleteCategorySuccess = defaultActionCreator(DELETE_CATEGORY_SUCCESS, 'data')
export const DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR'
export const deleteCategoryError = defaultActionCreator(DELETE_CATEGORY_ERROR, 'data')
