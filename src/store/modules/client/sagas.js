import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import { destroy, show, store, update } from '../../../services/axiosRoutes';
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

function* createRequest({ payload }) {
    try {
        const response = yield call(store, '/client', payload);

        yield put(actions.createClientSuccess(response.data));
        toast.success('Cliente registrado com sucesso.');
        yield put(actions.fetchClientsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.createClientFailure(errors));
    }
}

function* updateRequest({ payload }) {
    try {
        const response = yield call(update, `/client/${payload._id}`, payload);

        yield put(actions.updateClientSuccess(response.data));
        toast.success('Cliente atualizado com sucesso.');
        yield put(actions.fetchClientsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.updateClientFailure(errors));
    }
}

function* deleteRequest({ payload }) {
    try {
        yield call(destroy, `/client/${payload._id}`);
        yield put(actions.deleteClientSuccess());
        toast.success('Cliente deletado com sucesso.');
        yield put(actions.fetchClientsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);
        errors.forEach((message) => toast.error(message));
        yield put(actions.deleteClientFailure(errors));
    }
}

export default all([
    takeLatest(types.FETCH_CLIENTS_REQUEST, fetchClients),
    takeLatest(types.CREATE_CLIENT_REQUEST, createRequest),
    takeLatest(types.UPDATE_CLIENT_REQUEST, updateRequest),
    takeLatest(types.DELETE_CLIENT_REQUEST, deleteRequest),
]);
