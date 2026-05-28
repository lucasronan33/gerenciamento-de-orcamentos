import * as types from '../types';


const initialState = {
    isLoading: false,
    success: false,
    client: null,
    errors: [],
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER_CLIENT_REQUEST:
        case types.UPDATE_CLIENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: [],
            };
        case types.REGISTER_CLIENT_SUCCESS:
        case types.UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                client: action.payload.client,
                errors: []
            }
        case types.REGISTER_CLIENT_FAILURE:
        case types.UPDATE_CLIENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload || [],
            }

        case types.CLIENT_RESET:
            return initialState
        default:
            return state
    }
}