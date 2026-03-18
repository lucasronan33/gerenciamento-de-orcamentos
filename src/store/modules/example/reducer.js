import * as types from '../types';

const initialState = {
    botaoClickado: false,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.BOTAO_CLICKADO_SUCCESS: {
            console.log('sucesso!');
            const newState = { ...state };
            newState.botaoClickado = !newState.botaoClickado;
            return newState;
        }
        case types.BOTAO_CLICKADO_FAILURE: {
            console.log('deu erro!');
            return state;
        }
        case types.BOTAO_CLICKADO_REQUEST: {
            console.log('fazendo requisicao');
            return state;
        }
        default:
            return state;
    }
}
