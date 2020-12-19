import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhotos} from "../../store/actions/photosActions";
import PhotoCard from "../../components/PhotoCard/PhotoCard";

const Photos = (props) => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container direction="row" spacing={2}>
                {photos.map(photo => {
                    return <PhotoCard
                        key={photo._id}
                        id={photo._id}
                        photoUser={photo.user}
                        image={photo.image}
                        title={photo.title}
                        path={props}
                    />
                })}
            </Grid>
        </Grid>
    );
};

export default Photos;