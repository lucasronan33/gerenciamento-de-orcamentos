import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types'
import { toast } from 'react-toastify'
const requisicao = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 600);
    });

function* exampleRequest() {
    try {
        yield call(requisicao);
        yield put(actions.clicaBotaoSuccess());
    } catch (error) {
        toast.error('Deu erro')
        yield put(actions.clicaBotaoFailure());
    }
}

export default all([takeLatest(types.BOTAO_CLICKADO_REQUEST, exampleRequest)])