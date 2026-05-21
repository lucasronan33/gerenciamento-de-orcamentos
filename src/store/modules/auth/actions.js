import * as types from '../types';

export function loginRequest(payload) {
    return {
        type: types.LOGIN_REQUEST,
        payload,
    };
}

export function loginSuccess(payload) {
    return {
        type: types.LOGIN_SUCCESS,
        payload,
    };
}

export function loginFailure(payload) {
    return {
        type: types.LOGIN_FAILURE,
        payload,
    };
}

export function registerRequest(payload) {
    return {
        type: types.REGISTER_REQUEST,
        payload,
    };
}

export function registerSuccess(payload) {
    return {
        type: types.REGISTER_SUCCESS,
        payload,
    };
}

export function registerFailure(payload) {
    return {
        type: types.REGISTER_FAILURE,
        payload,
    };
}

export function registerReset() {
    return {
        type: types.REGISTER_RESET,
    };
}

export function authMeRequest() {
    return {
        type: types.AUTH_ME_REQUEST,
    };
}

export function authMeSuccess(payload) {
    return {
        type: types.AUTH_ME_SUCCESS,
        payload,
    };
}

export function authMeFailure() {
    return {
        type: types.AUTH_ME_FAILURE,
    };
}

export function logoutRequest() {
    return {
        type: types.LOGOUT_REQUEST,
    };
}

export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS,
    };
}

export function googleLoginRequest(payload) {
    return {
        type: types.GOOGLE_LOGIN_REQUEST,
        payload,
    };
}

export function googleLoginSuccess(payload) {
    return {
        type: types.GOOGLE_LOGIN_SUCCESS,
        payload,
    };
}

export function googleLoginFailure(payload) {
    return {
        type: types.GOOGLE_LOGIN_FAILURE,
        payload,
    };
}

export function updateUserRequest(payload) {
    return {
        type: types.UPDATE_USER_REQUEST,
        payload,
    };
}

export function updateUserSuccess(payload) {
    return {
        type: types.UPDATE_USER_SUCCESS,
        payload,
    };
}

export function updateUserFailure(payload) {
    return {
        type: types.UPDATE_USER_FAILURE,
        payload,
    };
}