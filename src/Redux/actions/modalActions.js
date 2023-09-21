// Define your modal-related actions here
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_MODAL = "OPEN_MODAL";
export const SET_MODAL_NAME = "SET_MODAL_NAME";
export const SET_COUNTRY_ID = "SET_COUNTRY_ID";

export const openModal = (modalName) => {
  return {
    type: OPEN_MODAL,
    payload: modalName,
  };
};

export const setModalName = (modalName) => {
  return {
    type: SET_MODAL_NAME,
    payload: modalName,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const setCountryId = (countryId) => {
  return {
    type: SET_COUNTRY_ID,
    payload: countryId,
  };
};
