import * as types from '../types';

// =============================
// CREATE
// =============================
export function createClientRequest(payload) {
    return {
        type: types.CREATE_CLIENT_REQUEST,
        payload,
    };
}

export function createClientSuccess(payload) {
    return {
        type: types.CREATE_CLIENT_SUCCESS,
        payload,
    };
}

export function createClientFailure(payload) {
    return {
        type: types.CREATE_CLIENT_FAILURE,
        payload,
    };
}

// =============================
// READ
// =============================
export function fetchClientsRequest() {
    return {
        type: types.FETCH_CLIENTS_REQUEST,
    };
}

export function fetchClientsSuccess(payload) {
    return {
        type: types.FETCH_CLIENTS_SUCCESS,
        payload,
    };
}

export function fetchClientsFailure(payload) {
    return {
        type: types.FETCH_CLIENTS_FAILURE,
        payload,
    };
}

// =============================
// UPDATE
// =============================
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

// =============================
// DELETE
// =============================
export function deleteClientRequest(payload) {
    return {
        type: types.DELETE_CLIENT_REQUEST,
        payload,
    };
}

export function deleteClientSuccess() {
    return {
        type: types.DELETE_CLIENT_SUCCESS,
    };
}

export function deleteClientFailure(payload) {
    return {
        type: types.DELETE_CLIENT_FAILURE,
        payload,
    };
}

// =============================
export function clientReset() {
    return {
        type: types.CLIENT_RESET,
    };
}