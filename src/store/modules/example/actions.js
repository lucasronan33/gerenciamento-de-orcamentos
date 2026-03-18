import * as types from '../types';

export function clicaBotaoRequest() {
    return {
        type: types.BOTAO_CLICKADO_REQUEST,
    };
}
export function clicaBotaoSuccess() {
    return {
        type: types.BOTAO_CLICKADO_SUCCESS,
    };
}
export function clicaBotaoFailure() {
    return {
        type: types.BOTAO_CLICKADO_FAILURE,
    };
}
