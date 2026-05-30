import * as types from '../types';


const initialState = {
    isLoading: false,
    isLoadingClients: false,
    success: false,
    client: null,
    clients: [],
    errors: [],
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_CLIENTS_REQUEST:
            return {
                ...state,
                isLoadingClients: true,
                errors: [],
            };
        case types.FETCH_CLIENTS_SUCCESS:
            return {
                ...state,
                isLoadingClients: false,
                success: false,
                clients: action.payload,
                errors: []
            }
        case types.FETCH_CLIENTS_FAILURE:
            return {
                ...state,
                isLoadingClients: false,
                errors: action.payload || [],
            }

        case types.CREATE_CLIENT_REQUEST:
        case types.UPDATE_CLIENT_REQUEST:
        case types.DELETE_CLIENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: [],
            };
        case types.CREATE_CLIENT_SUCCESS:
        case types.UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                client: action.payload.client,
                errors: []
            }
        case types.CREATE_CLIENT_FAILURE:
        case types.UPDATE_CLIENT_FAILURE:
        case types.DELETE_CLIENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: false,
                errors: action.payload || [],
            }

        case types.DELETE_CLIENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errors: [],
            }

        case types.CLIENT_RESET:
            return initialState
        default:
            return state
    }
}