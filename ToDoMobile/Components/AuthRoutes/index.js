import React from 'react';
import {InteractionManager} from 'react-native';
import {Auth} from "aws-amplify";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import Login from '../../Pages/Login'
import Register from '../../Pages/Register';
import TaskList from "../../Pages/TaskList";

const stack = {
    'Login': <Login />,
    'TaskList': <TaskList />,
    'Register': <Register />
};

const AuthRoute = props => {
    const [isAuthed, setAuthed] = React.useState(false);
    const loginState = useSelector(state => state.user.login, shallowEqual);
    const pageState = useSelector(state => state.user.page, shallowEqual);
    const dispatch = useDispatch();

    React.useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setAuthed(loginState.success);
        })
    }, [loginState])

    React.useEffect(() => {
        InteractionManager.runAfterInteractions(() => Auth.currentAuthenticatedUser({
            bypassCache: true,
        }).then(user => {
            dispatch(setUser(user))
            isAuthed(true);
        }).catch(() => {
            setAuthed(false);
        }));
    }, []);

    return isAuthed ? stack['TaskList'] : stack[pageState];
};

export default AuthRoute;
