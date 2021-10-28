import {defaultActionCreator} from ".";

export const GET_INFO_WISATA_REQUEST = 'GET_INFO_WISATA_REQUEST'
export const getInfoWisataRequest = defaultActionCreator(GET_INFO_WISATA_REQUEST, 'data')
export const GET_INFO_WISATA_SUCCESS = 'GET_INFO_WISATA_SUCCESS'
export const getInfoWisataSuccess = defaultActionCreator(GET_INFO_WISATA_SUCCESS, 'data')
export const GET_INFO_WISATA_ERROR = 'GET_INFO_WISATA_ERROR'
export const getInfoWisataError = defaultActionCreator(GET_INFO_WISATA_ERROR, 'data')

export const GET_INFO_WISATA_BY_ID_REQUEST = 'GET_INFO_WISATA_BY_ID_REQUEST'
export const getInfoWisataByIdRequest = defaultActionCreator(GET_INFO_WISATA_BY_ID_REQUEST, 'data')
export const GET_INFO_WISATA_BY_ID_SUCCESS = 'GET_INFO_WISATA_BY_ID_SUCCESS'
export const getInfoWisataByIdSuccess = defaultActionCreator(GET_INFO_WISATA_BY_ID_SUCCESS, 'data')
export const GET_INFO_WISATA_BY_ID_ERROR = 'GET_INFO_WISATA_BY_ID_ERROR'
export const getInfoWisataByIdError = defaultActionCreator(GET_INFO_WISATA_BY_ID_ERROR, 'data')

export const INSERT_INFO_WISATA_REQUEST = 'INSERT_INFO_WISATA_REQUEST'
export const insertInfoWisataRequest = defaultActionCreator(INSERT_INFO_WISATA_REQUEST,'data','func' )
export const INSERT_INFO_WISATA_SUCCESS = 'INSERT_INFO_WISATA_SUCCESS'
export const insertInfoWisataSuccess = defaultActionCreator(INSERT_INFO_WISATA_SUCCESS, 'data')
export const INSERT_INFO_WISATA_ERROR = 'INSERT_INFO_WISATA_ERROR'
export const insertInfoWisataError = defaultActionCreator(INSERT_INFO_WISATA_ERROR, 'data')

export const UPDATE_INFO_WISATA_REQUEST = 'UPDATE_INFO_WISATA_REQUEST'
export const updateInfoWisataRequest = defaultActionCreator(UPDATE_INFO_WISATA_REQUEST,'data','id','func' )
export const UPDATE_INFO_WISATA_SUCCESS = 'UPDATE_INFO_WISATA_SUCCESS'
export const updateInfoWisataSuccess = defaultActionCreator(UPDATE_INFO_WISATA_SUCCESS, 'data')
export const UPDATE_INFO_WISATA_ERROR = 'UPDATE_INFO_WISATA_ERROR'
export const updateInfoWisataError = defaultActionCreator(UPDATE_INFO_WISATA_ERROR, 'data')

export const DELETE_INFO_WISATA_REQUEST = 'DELETE_INFO_WISATA_REQUEST'
export const deleteInfoWisataRequest = defaultActionCreator(DELETE_INFO_WISATA_REQUEST,'id','func' )
export const DELETE_INFO_WISATA_SUCCESS = 'DELETE_INFO_WISATA_SUCCESS'
export const deleteInfoWisataSuccess = defaultActionCreator(DELETE_INFO_WISATA_SUCCESS, 'data')
export const DELETE_INFO_WISATA_ERROR = 'DELETE_INFO_WISATA_ERROR'
export const deleteInfoWisataError = defaultActionCreator(DELETE_INFO_WISATA_ERROR, 'data')
