import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserPhoto} from "../../store/actions/photosActions";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import MenuItem from "@material-ui/core/MenuItem";
import {NavLink} from "react-router-dom";

const MyGallery = (props) => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.userPhotos);
    let userSessions = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchUserPhoto(userSessions._id));
    }, [dispatch, userSessions]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container direction="row" justify="space-between" alignItems="center">
                {
                    props && props.location.pathname === "/my_gallery" && userSessions &&
                    <MenuItem><NavLink id="newPhoto" className="title" to="/new_photo">Add photo</NavLink></MenuItem>
                }
            </Grid>


            <Grid item container direction="row" spacing={2}>
                {photos && photos.map(photo => {
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

export default MyGallery;