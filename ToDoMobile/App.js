import React from 'react';
import type {Node} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthRoute from './Components/AuthRoutes';

// Setup store
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import taskReducer from './Modules/taskReducer';
import userReducer from "./Modules/userReducer";

const reducers = combineReducers({
    tasks: taskReducer,
    user: userReducer,
})
const store = createStore(reducers, applyMiddleware(thunk));

// Setup amplify
import Amplify from 'aws-amplify';
import config from './config';

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

const App: () => Node = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView>
                <AuthRoute />
            </GestureHandlerRootView>
        </Provider>
    );
};

export default App;
