import React from "react";
import {useDispatch} from "react-redux";
import {createPhoto as onPhotoCreated} from "../../store/actions/photosActions";
import PhotoCreationForm from "../../components/PhotoCreationForm/PhotoCreationForm";

const NewPhoto = () => {
    const dispatch = useDispatch();

    const createPhoto = photoData => {
        dispatch(onPhotoCreated(photoData));
    };

    return (
        <>
            <h1>New photo</h1>
            <PhotoCreationForm
                onSubmit={createPhoto}
            />
        </>
    );
};

export default NewPhoto;