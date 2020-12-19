import axios from "../../axiosApi";
import {
    CREATE_PHOTO_SUCCESS,
    FETCH_FAILURE,
    FETCH_PHOTOS_SUCCESS, FETCH_USER_PHOTOS_SUCCESS,
} from "../actionTypes";
import {push} from "connected-react-router";

const fetchPhotosSuccess = photos => {
    return {type: FETCH_PHOTOS_SUCCESS, photos};
};

const fetchUserPhotosSuccess = userPhotos => {
    return {type: FETCH_USER_PHOTOS_SUCCESS, userPhotos};
};

const fetchFailure = error => {
    return {type: FETCH_FAILURE, error};
};

const createPhotoSuccess = () => {
    return {type: CREATE_PHOTO_SUCCESS};
};

export const fetchPhotos = () => {
    return async dispatch => {
        try {
            await axios.get("/photos").then(response => {
                dispatch(fetchPhotosSuccess(response.data));
            })
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};

export const fetchUserPhoto = (query) => {
    return async dispatch => {
        try {
            await axios.get(`/photos/${query}`).then(response => {
                    dispatch(fetchUserPhotosSuccess(response.data));
            });
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};



export const createPhoto = photoData => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            await axios.post("/photos", photoData, {headers})
            dispatch(createPhotoSuccess());
            dispatch(push("/"));
            dispatch(fetchFailure());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};

export const deleteItem = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            const userId = getState().users.user._id;
            await axios.delete(`/photos/${id}`, {headers});
            dispatch(fetchUserPhoto(userId));
        } catch(e) {
            if (e.response && e.response.data) {
                dispatch(fetchFailure(e.response.data));
            } else {
                dispatch(fetchFailure({global: "No internet"}));
            }
        }
    };
};



