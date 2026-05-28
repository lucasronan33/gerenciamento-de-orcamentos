import * as types from '../types';

export function registerClientRequest(payload) {
    return {
        type: types.REGISTER_CLIENT_REQUEST,
        payload,
    };
}

export function registerClientSuccess(payload) {
    return {
        type: types.REGISTER_CLIENT_SUCCESS,
        payload,
    };
}

export function registerClientFailure(payload) {
    return {
        type: types.REGISTER_CLIENT_FAILURE,
        payload,
    };
}

export function updateClientRequest(payload) {
    return {
        type: types.UPDATE_CLIENT_REQUEST,
        payload,
    };
}

export function updateClientSuccess(payload) {
    return {
        type: types.UPDATE_CLIENT_SUCCESS,
        payload,
    };
}

export function updateClientFailure(payload) {
    return {
        type: types.UPDATE_CLIENT_FAILURE,
        payload,
    };
}

export function clientReset() {
    return {
        type: types.CLIENT_RESET,
    };
}