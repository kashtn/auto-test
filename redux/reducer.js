import { SET_DATA, SET_SEARCH_VALUE } from "./actionTypes";

const initialState = {
  searchValue: "",
  data: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
