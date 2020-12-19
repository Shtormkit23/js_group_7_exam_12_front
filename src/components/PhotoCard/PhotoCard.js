import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import PropTypes from "prop-types";
import {apiURL} from "../../constants";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteItem} from "../../store/actions/photosActions";
import Modal from "../Modal/Modal";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    root: {
        width: 400,
        marginLeft: 15,
        marginBottom: 15,
    },
    title: {
        flexGrow: 1
    }
});


const PhotoCard = ({id, title, image, photoUser, path}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let user = useSelector(state => state.users.user);
    const [open, setOpen] = useState(false);

    let cardImage = "";
    if (image) {
        cardImage = apiURL + "/uploads/" + image;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal open={open} close={handleClose} image={cardImage}/>
            <Card className={classes.root}>
                <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="300"
                        image={cardImage}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <NavLink exact to={`/photos/${photoUser._id}`}
                             className="title"><span>{photoUser.displayName ? photoUser.displayName : photoUser.username}</span></NavLink>
                    {
                        path && path.location.pathname === "/my_gallery" && user && user._id === photoUser._id &&
                        <button className="button-4" onClick={() => dispatch(deleteItem(id))}><span>Delete item</span>
                        </button>
                    }
                    {
                        path && path.location.pathname === `/photos/${photoUser._id}` && user && user._id === photoUser._id &&
                        <button className="button-4" onClick={() => dispatch(deleteItem(id))}><span>Delete item</span></button>
                    }
                    <IconButton className={classes.icon} onClick={handleClickOpen}>
                        <ZoomOutMapIcon fontSize="small" />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
};

PhotoCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    photoUser: PropTypes.object.isRequired,
    path: PropTypes.object.isRequired
}


export default PhotoCard;