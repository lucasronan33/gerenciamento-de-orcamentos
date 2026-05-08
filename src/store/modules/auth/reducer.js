import * as types from '../types';

const initialState = {
    isLoading: false,
    isCheckingAuth: true,
    isLoggedIn: false,
    isRegistered: false,
    user: null,
    accessToken: null,
    errors: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
        case types.REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isCheckingAuth: false,
                errors: [],
            };

        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isCheckingAuth: false,
                isLoggedIn: true,
                isRegistered: action.type === types.REGISTER_SUCCESS,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                errors: [],
            };

        case types.LOGIN_FAILURE:
        case types.REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isCheckingAuth: false,
                isLoggedIn: false,
                isRegistered: false,
                errors: action.payload,
            };

        case types.REGISTER_RESET:
            return {
                ...state,
                isRegistered: false,
            };

        case types.AUTH_ME_REQUEST:
            return {
                ...state,
                isCheckingAuth: true,
            };

        case types.AUTH_ME_SUCCESS:
            return {
                ...state,
                isCheckingAuth: false,
                isLoggedIn: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken || state.accessToken,
                errors: [],
            };

        case types.AUTH_ME_FAILURE:
        case types.LOGOUT_SUCCESS:
            return {
                ...initialState,
                isCheckingAuth: false,
            };

        default:
            return state;
    }
}
