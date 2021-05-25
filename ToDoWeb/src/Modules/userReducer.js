import {
    LOGIN_USER,
    LOGIN_FAILED,
    REGISTER_USER,
    REGISTER_FAILED,
    LOGIN_ATTEMPT,
    REGISTER_ATTEMPT,
    CHANGE_PAGE
} from "./Constants";

const initialState = {
    user: {},
    page: 'Login',
    loggedIn: false,
    login: {
        attempting: false,
        error: false,
        success: false,
        code: "",
    },
    register: {
        attempting: false,
        error: false,
        code: "",
    }
}

const userReducer = (state = initialState, action) => {
    const newState = {...state};

    switch(action.type) {
        case CHANGE_PAGE:
            newState.page = action.payload;
            break;
        case LOGIN_ATTEMPT:
            newState.login = {
                attempting: true,
                error: false,
                success: false,
                code: "",
            }
            break;
        case LOGIN_USER:
            newState.user = action.payload;
            newState.page = '/';
            newState.loggedIn = true;
            newState.login = {
                attempting: false,
                error: false,
                success: true,
                code: "",
            }
            break;
        case LOGIN_FAILED:
            newState.login = {
                attempting: false,
                error: true,
                success: false,
                code: action.payload,
            }
            break;
        case REGISTER_ATTEMPT:
            newState.register = {
                attempting: true,
                error: false,
                success: false,
                code: "",
            }
            break;
        case REGISTER_USER:
            newState.register = {
                attempting: false,
                error: false,
                success: true,
                code: "",
            }
            break;
        case REGISTER_FAILED:
            const codes = {
                'InvalidParameterException': 'Password requires at least: 1 uppercase, 1 lowercase, 1 symbol, 1 number and a minimum of 8 characters',
                'UsernameExistsException': 'Username already taken',
            }
            newState.register = {
                attempting: false,
                error: true,
                success: false,
                code: codes.hasOwnProperty(action.payload) ? codes[action.payload] : action.payload,
            }
            break;
        default:
            break;
    }

    return newState;
}

export default userReducer;
