import {LOGIN_USER, LOGIN_FAILED, REGISTER_USER, REGISTER_FAILED, LOGIN_ATTEMPT, CHANGE_PAGE} from "./Constants";
import {Auth} from 'aws-amplify';

export const loginUser = (username, password) => (dispatch) => {
    dispatch({
        type: LOGIN_ATTEMPT,
        payload: null,
    });

    return Auth.signIn(username.toLowerCase(), password).then(user => {
        dispatch({
            type: LOGIN_USER,
            payload: user
        })
    }).catch(e => {
        dispatch({
            type: LOGIN_FAILED,
            payload: e.log || e.code,
        })
    })
}

export const setUser = (user) => dispatch => {
    dispatch({
        type: LOGIN_USER,
        payload: user,
    })
}

export const changePage = page => dispatch => {
    dispatch({
        type: CHANGE_PAGE,
        payload: page,
    })
}

export const registerUser = (username, password) => dispatch => (
    Auth.signUp({
        username,
        password
    }).then(() => {
        dispatch({
            type: REGISTER_USER,
            payload: null,
        })
    }).catch(e => {
        const code = e.log || e.code;

        // Seemingly at random times cognito likes to say that lambda gave a bad response
        // This is a lie as literally nothing is wrong or out of place... I don't know why
        if(code === 'InvalidLambdaResponseException') {
            dispatch({
                type: REGISTER_USER,
                payload: null,
            })
            return;
        }

        dispatch({
            type: REGISTER_FAILED,
            payload: e.log || e.code,
        })
    })
)
