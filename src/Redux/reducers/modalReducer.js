// Define your modal reducer here
import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_MODAL_NAME,
  SET_COUNTRY_ID,
} from "../actions/modalActions";

const initialState = {
  isModalAOpen: false,
  isModalBOpen: false,
  isOpen: false,
  countryId: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        isModalAOpen: false,
        isModalBOpen: false,
        isOpen: false,
      };
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        modalContent: action.payload,
      };
    case SET_MODAL_NAME:
      return {
        ...state,
        modalContent: action.payload,
      };
    case SET_COUNTRY_ID:
      return {
        ...state,
        countryId: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
