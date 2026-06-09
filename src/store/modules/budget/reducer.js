import * as types from '../types';


const initialState = {
    isLoading: false,
    isLoadingItems: false,
    success: false,
    budget: null,
    budgets: [],
    errors: [],
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_BUDGETS_REQUEST:
            return {
                ...state,
                isLoadingItems: true,
                errors: [],
            };
        case types.FETCH_BUDGETS_SUCCESS:
            return {
                ...state,
                isLoadingItems: false,
                success: false,
                budgets: action.payload,
                errors: []
            }
        case types.FETCH_BUDGETS_FAILURE:
            return {
                ...state,
                isLoadingItems: false,
                errors: action.payload || [],
            }

        case types.CREATE_BUDGET_REQUEST:
        case types.UPDATE_BUDGET_REQUEST:
        case types.DELETE_BUDGET_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: [],
            };
        case types.CREATE_BUDGET_SUCCESS:
        case types.UPDATE_BUDGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                budget: action.payload.budget,
                errors: []
            }
        case types.CREATE_BUDGET_FAILURE:
        case types.UPDATE_BUDGET_FAILURE:
        case types.DELETE_BUDGET_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: false,
                errors: action.payload || [],
            }

        case types.DELETE_BUDGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errors: [],
            }

        case types.BUDGET_RESET:
            return {
                ...state,
                budget: null
            }
        default:
            return state
    }
}