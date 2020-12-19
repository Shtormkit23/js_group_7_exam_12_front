import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewPhoto from "./containers/NewPhoto/NewPhoto";
import Photos from "./containers/Photos/Photos";
import MyGallery from "./containers/MyGallery/MyGallery";
import UserGallery from "./containers/UserGallery/UserGallery";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />
};

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Photos} />
            <Route path="/photos/:id" exact component={UserGallery} />
            <ProtectedRoute
                path="/register"
                exact
                component={Register}
                isAllowed={!user}
                redirectTo="/"
            />
            <ProtectedRoute
                path="/login"
                exact
                component={Login}
                isAllowed={!user}
                redirectTo="/"
            />
            <ProtectedRoute
                path="/new_photo"
                exact
                component={NewPhoto}
                isAllowed={user}
                redirectTo="/login"
            />
            <ProtectedRoute
                path="/my_gallery"
                exact
                component={MyGallery}
                isAllowed={user}
                redirectTo="/login"
            />
            <Route render={() => <h1>404 Not Found</h1>}/>
        </Switch>
    );
}

export default Routes;