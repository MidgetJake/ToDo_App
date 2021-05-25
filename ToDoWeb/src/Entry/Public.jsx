import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import history from "../Modules/history";
import Amplify from 'aws-amplify';
import config from 'config';

// Setup store
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import taskReducer from 'Modules/taskReducer';
import userReducer from "Modules/userReducer";

const reducers = combineReducers({
    tasks: taskReducer,
    user: userReducer,
})
const store = createStore(reducers, applyMiddleware(thunk));

import theme from 'Themes/light';
import AuthRoute from "../Components/AuthRoute";

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
    API: {
        endpoints: [{
            name: 'ToDo_API',
            endpoint: config.apiGateway.URL,
            region: config.apiGateway.REGION,
        }]
    }
});

function MainRouter() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <ThemeProvider theme={theme}>
                    <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'}}>
                        <AuthRoute />
                    </div>
                </ThemeProvider>
            </Router>
        </Provider>
    );
}

ReactDOM.render(<MainRouter />, document.getElementById('app'));
