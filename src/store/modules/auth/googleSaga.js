import { all, call, put, takeLatest } from 'redux-saga/effects';
import { setAccessToken } from '../../../services/authToken';
import { toast } from 'react-toastify';
import { store } from '../../../services/axiosRoutes';
import { googleLoginFailure, googleLoginSuccess } from './actions';
import { normalizeErrors } from './sagas';
import { GOOGLE_LOGIN_REQUEST } from '../types';

function* googleLogin({ payload }) {
    try {
        const response = yield call(store, '/auth/google', payload);
        const { accessToken, user } = response.data;

        console.log(payload)
        setAccessToken(accessToken);

        yield put(googleLoginSuccess({
            user,
            accessToken,
        }));

        toast.success('Login realizado com sucesso.');

    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(googleLoginFailure(errors));
    }
}

export default all([
    takeLatest(GOOGLE_LOGIN_REQUEST, googleLogin)
])