import {
  FETCH_PHOTOS_SUCCESS,
  FETCH_USER_PHOTOS_SUCCESS,
  FETCH_FAILURE,
} from "../actionTypes";

const initialState = {
  photos: [],
  userPhotos: [],
  error: null
};

const photosReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PHOTOS_SUCCESS:
      return {...state, photos: action.photos};
    case FETCH_USER_PHOTOS_SUCCESS:
      return {...state, userPhotos: action.userPhotos};
    case FETCH_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default photosReducer;