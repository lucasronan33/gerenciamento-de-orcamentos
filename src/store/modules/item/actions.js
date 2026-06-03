import * as types from '../types';

// =============================
// CREATE
// =============================
export function createItemRequest(payload) {
    return {
        type: types.CREATE_ITEM_REQUEST,
        payload,
    };
}

export function createItemSuccess(payload) {
    return {
        type: types.CREATE_ITEM_SUCCESS,
        payload,
    };
}

export function createItemFailure(payload) {
    return {
        type: types.CREATE_ITEM_FAILURE,
        payload,
    };
}

// =============================
// READ
// =============================
export function fetchItemsRequest() {
    return {
        type: types.FETCH_ITEMS_REQUEST,
    };
}

export function fetchItemsSuccess(payload) {
    return {
        type: types.FETCH_ITEMS_SUCCESS,
        payload,
    };
}

export function fetchItemsFailure(payload) {
    return {
        type: types.FETCH_ITEMS_FAILURE,
        payload,
    };
}

// =============================
// UPDATE
// =============================
export function updateItemRequest(payload) {
    return {
        type: types.UPDATE_ITEM_REQUEST,
        payload,
    };
}

export function updateItemSuccess(payload) {
    return {
        type: types.UPDATE_ITEM_SUCCESS,
        payload,
    };
}

export function updateItemFailure(payload) {
    return {
        type: types.UPDATE_ITEM_FAILURE,
        payload,
    };
}

// =============================
// DELETE
// =============================
export function deleteItemRequest(payload) {
    return {
        type: types.DELETE_ITEM_REQUEST,
        payload,
    };
}

export function deleteItemSuccess() {
    return {
        type: types.DELETE_ITEM_SUCCESS,
    };
}

export function deleteItemFailure(payload) {
    return {
        type: types.DELETE_ITEM_FAILURE,
        payload,
    };
}

// =============================
export function itemReset() {
    return {
        type: types.ITEM_RESET,
    };
}