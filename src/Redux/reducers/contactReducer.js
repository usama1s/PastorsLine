// Define your contact reducer here
import {
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
} from "../actions/contactActions";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
