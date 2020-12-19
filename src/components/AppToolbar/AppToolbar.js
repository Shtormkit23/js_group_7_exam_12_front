import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import UserMenu from "../Menu/UserMenu";
import AnonymousMenu from "../Menu/AnonymousMenu";

const useStyles = makeStyles(theme => ({
    mainLink: {
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
            color: "inherit"
        },
        fontFamily: "Montserrat",
        textTransform: "uppercase"
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    container: {
        display: "flex"
    },
    app: {
        backgroundColor: "#159957",
        backgroundImage: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(25,25,101,1) 35%, rgba(64,20,85,1) 75%, rgba(19,7,71,1) 100%);"
    }
}));

const AppToolbar = ({user}) => {
    const classes = useStyles();
    return (
        <>
            <AppBar className={classes.app}>
                <Toolbar>
                    <Container className={classes.container}>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/" className={classes.mainLink}>Photo Gallery</Link>
                        </Typography>
                        {user ?
                            <UserMenu user={user}/>
                            : <AnonymousMenu/>
                        }
                    </Container>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;