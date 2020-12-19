import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "fixed",
        top: "50px",
        left: "10px",
        background: "transparent",
        boxShadow: "none",
        paddingTop: "10px",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    media: {
        width: "100%",
    },
    wrap: {
        height: "inherit",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const Modal = ({ open, close, image }) => {
    const classes = useStyles();

    return (
        <div>
            <Dialog
                maxWidth={"lg"}
                open={open}
                onClose={close}
                TransitionComponent={Transition}
            >
                <Grid item container justify="center" className={classes.wrap}>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title="media"
                        component="img"
                        onClick={close}
                    />
                </Grid>
            </Dialog>
        </div>
    );
};

export default Modal;