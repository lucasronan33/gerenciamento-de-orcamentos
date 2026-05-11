import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { show, store } from '../../../services/axiosRoutes';
import { clearAccessToken, setAccessToken } from '../../../services/authToken';
import * as actions from './actions';
import * as types from '../types';

export function normalizeErrors(error) {
    const data = error.response?.data;

    if (Array.isArray(data?.errors)) {
        return data.errors.map((item) => {
            if (typeof item === 'string') return item;
            if (item.message) return item.message;
            if (item.error) return item.error;
            return Object.values(item).join(', ');
        });
    }

    if (data?.errors && typeof data.errors === 'object') {
        return Object.values(data.errors).flat();
    }

    if (data?.message) return [data.message];
    if (data?.error) return [data.error];
    if (error.message) return [error.message];

    return ['Nao foi possivel concluir a solicitacao.'];
}

function* loginRequest({ payload }) {
    try {
        const response = yield call(store, '/auth/login', payload);
        const { accessToken } = response.data;

        setAccessToken(accessToken);
        yield put(actions.loginSuccess(response.data));
        toast.success('Login realizado com sucesso.');
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.loginFailure(errors));
    }
}

function* registerRequest({ payload }) {
    try {
        const response = yield call(store, '/auth/register', payload);
        const { accessToken } = response.data;

        setAccessToken(accessToken);
        yield put(actions.registerSuccess(response.data));
        toast.success('Usuario registrado com sucesso.');
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.registerFailure(errors));
    }
}

function* authMeRequest() {
    try {
        const response = yield call(show, '/auth/me');

        yield put(actions.authMeSuccess(response.data));
    } catch (error) {
        clearAccessToken();
        yield put(actions.authMeFailure());
    }
}

function* logoutRequest() {
    try {
        yield call(store, '/auth/logout');
    } finally {
        clearAccessToken();
        yield put(actions.logoutSuccess());
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
    takeLatest(types.AUTH_ME_REQUEST, authMeRequest),
    takeLatest(types.LOGOUT_REQUEST, logoutRequest),
]);
