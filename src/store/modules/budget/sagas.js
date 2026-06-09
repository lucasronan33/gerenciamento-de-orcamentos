import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import { destroy, show, store, update } from '../../../services/axiosRoutes';
import { normalizeErrors } from '../auth/sagas';
import state from '../../store'

function* fetchBudgets() {
    try {
        const { isLoggedIn } = state.getState().auth
        if (!isLoggedIn) {
            yield new Error('Usuário não autenticado')
        }

        const response = yield call(show, '/budgets')
        yield put(actions.fetchBudgetsSuccess(response.data))
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.fetchBudgetsFailure(errors));
    }
}

function* createRequest({ payload }) {
    try {
        const { isLoggedIn } = state.getState().auth
        if (!isLoggedIn) {
            yield new Error('Usuário não autenticado')
        }

        const response = yield call(store, '/budgets', payload);

        yield put(actions.createBudgetSuccess(response.data));
        toast.success(<div>Orçamento <strong>{payload.basic.code}</strong> criado com sucesso!</div>)
        yield put(actions.fetchBudgetsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.createBudgetFailure(errors));
    }
}

function* updateRequest({ payload }) {
    try {
        const { isLoggedIn } = state.getState().auth
        if (!isLoggedIn) {
            yield new Error('Usuário não autenticado')
        }
        const response = yield call(update, `/budgets/${payload._id}`, payload);

        yield put(actions.updateBudgetSuccess(response.data));
        toast.success(<div>Orçamento <strong>{payload.basic.code}</strong> atualizado com sucesso!</div>)
        yield put(actions.fetchBudgetsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);

        errors.forEach((message) => toast.error(message));
        yield put(actions.updateBudgetFailure(errors));
    }
}

function* deleteRequest({ payload }) {
    try {
        const { isLoggedIn } = state.getState().auth
        if (!isLoggedIn) {
            yield new Error('Usuário não autenticado')
        }
        yield call(destroy, `/budgets/${payload._id}`);
        yield put(actions.deleteBudgetSuccess());
        toast.success('Orçamento deletado com sucesso.');
        yield put(actions.fetchBudgetsRequest());
    } catch (error) {
        const errors = normalizeErrors(error);
        errors.forEach((message) => toast.error(message));
        yield put(actions.deleteBudgetFailure(errors));
    }
}

export default all([
    takeLatest(types.FETCH_BUDGETS_REQUEST, fetchBudgets),
    takeLatest(types.CREATE_BUDGET_REQUEST, createRequest),
    takeLatest(types.UPDATE_BUDGET_REQUEST, updateRequest),
    takeLatest(types.DELETE_BUDGET_REQUEST, deleteRequest),
]);
