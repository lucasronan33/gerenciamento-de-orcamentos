import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import { destroy, show, store, update } from '../../../services/axiosRoutes';
import { normalizeErrors } from '../auth/sagas';
import state from '../../store'

function* fetchItems() {
    try {
        const { isLoggedIn } = state.getState().auth
        if (!isLoggedIn) {
            yield new Error('Usuário não autenticado')
        }

        const response = yield call(show, '/Item')
        yield put(actions.fetchItemsSuccess(response.data))
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.fetchItemsFailure(errors));
    }
}

function* createRequest({ payload }) {
    try {
        const { isLoggedIn } = state.getState().auth
        if (!isLoggedIn) {
            yield new Error('Usuário não autenticado')
        }
        const response = yield call(store, '/Item', payload);

        yield put(actions.createItemsuccess(response.data));
        toast.success('Iteme registrado com sucesso.');
        yield put(actions.fetchItemsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.createItemFailure(errors));
    }
}

function* updateRequest({ payload }) {
    try {
        const { isLoggedIn } = state.getState().auth
        if (!isLoggedIn) {
            yield new Error('Usuário não autenticado')
        }
        const response = yield call(update, `/Item/${payload._id}`, payload);

        yield put(actions.updateItemsuccess(response.data));
        toast.success('Iteme atualizado com sucesso.');
        yield put(actions.fetchItemsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.updateItemFailure(errors));
    }
}

function* deleteRequest({ payload }) {
    try {
        const { isLoggedIn } = state.getState().auth
        if (!isLoggedIn) {
            yield new Error('Usuário não autenticado')
        }
        yield call(destroy, `/Item/${payload._id}`);
        yield put(actions.deleteItemsuccess());
        toast.success('Iteme deletado com sucesso.');
        yield put(actions.fetchItemsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);
        errors.forEach((message) => toast.error(message));
        yield put(actions.deleteItemFailure(errors));
    }
}

export default all([
    takeLatest(types.FETCH_ITEM_REQUEST, fetchItems),
    takeLatest(types.CREATE_ITEM_REQUEST, createRequest),
    takeLatest(types.UPDATE_ITEM_REQUEST, updateRequest),
    takeLatest(types.DELETE_ITEM_REQUEST, deleteRequest),
]);
