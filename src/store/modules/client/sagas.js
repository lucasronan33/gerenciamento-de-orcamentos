import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import { show, store } from '../../../services/axiosRoutes';
import { normalizeErrors } from '../auth/sagas';

function* fetchClients() {
    try {
        const response = yield call(show, '/client')
        yield put(actions.fetchClientsSuccess(response.data))
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.fetchClientsFailure(errors));
    }
}

function* registerRequest({ payload }) {
    try {
        const response = yield call(store, '/client', payload);

        yield put(actions.registerClientSuccess(response.data));
        toast.success('Cliente registrado com sucesso.');
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.registerClientFailure(errors));
    }
}

function* updateRequest({ payload }) {
    try {
        const response = yield call(store, '/client', payload);

        yield put(actions.updateClientSuccess(response.data));
        toast.success('Cliente atualizado com sucesso.');
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.updateClientFailure(errors));
    }
}

export default all([
    takeLatest(types.FETCH_CLIENTS_REQUEST, fetchClients),
    takeLatest(types.REGISTER_CLIENT_REQUEST, registerRequest),
    takeLatest(types.REGISTER_CLIENT_REQUEST, updateRequest),
    takeLatest(types.UPDATE_CLIENT_REQUEST, updateRequest),
]);
