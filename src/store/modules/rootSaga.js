import { all } from 'redux-saga/effects';

import auth from './auth/sagas'
import client from './client/sagas'
import item from './item/sagas'
import budget from './budget/sagas'
import googleSaga from './auth/googleSaga'

export default function* rootSaga() {
    return yield all([
        auth,
        googleSaga,
        client,
        item,
        budget,
    ])
}
