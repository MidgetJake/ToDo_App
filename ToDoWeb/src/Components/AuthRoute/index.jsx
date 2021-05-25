import React from 'react';
import {Switch, Redirect, Route, useHistory} from 'react-router';

import Home from 'Pages/Home';
import Landing from 'Pages/Landing';
import {useSelector} from "react-redux";

const AuthRoute = props => {
    const authed = useSelector(state => state.user.loggedIn);
    const history = useHistory();

    React.useEffect(() => {
        history.push(authed ? '/' : '/login');
    }, [authed, history.location.pathname])

    return (
        <Switch>
            <Route path={'/login'} component={Landing} />
            <Route path={'/'} component={Home} />
        </Switch>
    )
}

export default AuthRoute;
