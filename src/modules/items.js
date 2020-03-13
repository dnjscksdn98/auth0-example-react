import axios from "axios";

const GET_ITEMS_START = "items/GET_ITEMS_START";
const GET_ITEMS_SUCCESS = "items/GET_ITEMS_SUCCESS";
const GET_ITEMS_FAIL = "items/GET_ITEMS_FAIL";

export const start = () => {
  return {
    type: GET_ITEMS_START
  };
};

export const success = items => {
  return {
    type: GET_ITEMS_SUCCESS,
    items
  };
};

export const fail = error => {
  return {
    type: GET_ITEMS_FAIL,
    error
  };
};

export const getItems = token => dispatch => {
  dispatch(start());

  axios
    .get("http://localhost:8000/api/items", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(success(res.data));
    })
    .catch(err => {
      dispatch(fail(err));
    });
};

const initialState = {
  loading: false,
  items: null,
  error: null
};

export default function items(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_START:
      return {
        loading: false,
        items: null,
        error: null
      };
    case GET_ITEMS_SUCCESS:
      return {
        loading: false,
        items: action.items,
        error: null
      };
    case GET_ITEMS_FAIL:
      return {
        loading: false,
        items: null,
        error: action.error
      };
    default:
      return state;
  }
}
