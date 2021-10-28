import * as categoryFaqAction from "../actions/categoryFaq";

const initialState = {
  data: null,
  isLoading: null,
  isError: null,
  message: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case categoryFaqAction.GET_CATEGORY_FAQ_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
      };
    case categoryFaqAction.GET_CATEGORY_FAQ_SUCCESS:
      return { ...state, data: action.data, isLoading: false };
    case categoryFaqAction.GET_CATEGORY_FAQ_ERROR:
      return {
        ...state,
        data: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
