import * as types from '../types';


const initialState = {
    isLoading: false,
    isLoadingItems: false,
    success: false,
    item: null,
    items: [],
    errors: [],
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_ITEMS_REQUEST:
            return {
                ...state,
                isLoadingClients: true,
                errors: [],
            };
        case types.FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                isLoadingClients: false,
                success: false,
                clients: action.payload,
                errors: []
            }
        case types.FETCH_ITEMS_FAILURE:
            return {
                ...state,
                isLoadingClients: false,
                errors: action.payload || [],
            }

        case types.CREATE_ITEM_REQUEST:
        case types.UPDATE_ITEM_REQUEST:
        case types.DELETE_ITEM_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: [],
            };
        case types.CREATE_ITEM_SUCCESS:
        case types.UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                client: action.payload.client,
                errors: []
            }
        case types.CREATE_ITEM_FAILURE:
        case types.UPDATE_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: false,
                errors: action.payload || [],
            }

        case types.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errors: [],
            }

        case types.ITEM_RESET:
            return initialState
        default:
            return state
    }
}