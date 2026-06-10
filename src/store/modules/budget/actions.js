import * as types from '../types';

// =============================
// CREATE
// =============================
export function createBudgetRequest(payload) {
    return {
        type: types.CREATE_BUDGET_REQUEST,
        payload,
    };
}

export function createBudgetSuccess(payload) {
    return {
        type: types.CREATE_BUDGET_SUCCESS,
        payload,
    };
}

export function createBudgetFailure(payload) {
    return {
        type: types.CREATE_BUDGET_FAILURE,
        payload,
    };
}

// =============================
// READ
// =============================
export function fetchBudgetsRequest() {
    return {
        type: types.FETCH_BUDGETS_REQUEST,
    };
}

export function fetchBudgetsSuccess(payload) {
    return {
        type: types.FETCH_BUDGETS_SUCCESS,
        payload,
    };
}

export function fetchBudgetsFailure(payload) {
    return {
        type: types.FETCH_BUDGETS_FAILURE,
        payload,
    };
}

// =============================
// UPDATE
// =============================
export function updateBudgetRequest(payload) {
    return {
        type: types.UPDATE_BUDGET_REQUEST,
        payload,
    };
}

export function updateBudgetSuccess(payload) {
    return {
        type: types.UPDATE_BUDGET_SUCCESS,
        payload,
    };
}

export function updateBudgetFailure(payload) {
    return {
        type: types.UPDATE_BUDGET_FAILURE,
        payload,
    };
}

// =============================
// DELETE
// =============================
export function deleteBudgetRequest(payload) {
    return {
        type: types.DELETE_BUDGET_REQUEST,
        payload,
    };
}

export function deleteBudgetSuccess() {
    return {
        type: types.DELETE_BUDGET_SUCCESS,
    };
}

export function deleteBudgetFailure(payload) {
    return {
        type: types.DELETE_BUDGET_FAILURE,
        payload,
    };
}

// =============================
export function budgetReset() {
    return {
        type: types.BUDGET_RESET,
    };
}