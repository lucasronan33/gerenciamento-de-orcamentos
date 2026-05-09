import * as types from '../types';

const initialState = {
    botaoClickado: false,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.BOTAO_CLICKADO_SUCCESS: {
            const newState = { ...state };
            newState.botaoClickado = !newState.botaoClickado;
            return newState;
        }
        case types.BOTAO_CLICKADO_FAILURE: {
            return state;
        }
        case types.BOTAO_CLICKADO_REQUEST: {
            return state;
        }
        default:
            return state;
    }
}
