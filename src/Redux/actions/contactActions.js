// Define your contact-related actions here
import axios from "axios";

// Action types
export const FETCH_CONTACTS_REQUEST = "FETCH_CONTACTS_REQUEST";
export const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
export const FETCH_CONTACTS_FAILURE = "FETCH_CONTACTS_FAILURE";

// Action creators
export const fetchContactsRequest = () => {
  return {
    type: FETCH_CONTACTS_REQUEST,
  };
};

export const fetchContactsSuccess = (contacts) => {
  return {
    type: FETCH_CONTACTS_SUCCESS,
    payload: contacts,
  };
};

export const fetchContactsFailure = (error) => {
  return {
    type: FETCH_CONTACTS_FAILURE,
    payload: error,
  };
};

// Async action to fetch contacts from the API
export const fetchContacts = (
  companyId,
  query,
  page,
  countryId,
  prevContacts
) => {
  return (dispatch) => {
    dispatch(fetchContactsRequest());
    axios
      .get("https://api.dev.pastorsline.com/api/contacts.json", {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4",
        },
        params: {
          companyId,
          query,
          page,
          countryId,
          noGroupDuplicates: 1,
        },
      })
      .then((response) => {
        const contacts = response.data;
        if (prevContacts) {
          dispatch(
            fetchContactsSuccess(Object.assign(prevContacts, contacts.contacts))
          );
        } else {
          dispatch(fetchContactsSuccess(contacts.contacts));
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchContactsFailure(errorMessage));
      });
  };
};
