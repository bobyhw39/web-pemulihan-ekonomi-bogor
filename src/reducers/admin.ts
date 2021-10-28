import * as adminAction from "../actions/admin";

const initialState = {
  data: {},
  isLoading: null,
  isError: null,
  message: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case adminAction.GET_ADMIN_REQUEST:
      return {
        ...state,
        data: {},
        isLoading: true,
      };
    case adminAction.GET_ADMIN_SUCCESS:
      return { ...state, data: action.data, isLoading: false };
    case adminAction.GET_ADMIN_ERROR:
      return {
        ...state,
        data: {},
        isLoading: false,
      };
    default:
      return state;
  }
};
