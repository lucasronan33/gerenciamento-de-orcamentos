import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default reducers => {
    const persistedReducers = persistReducer({
        key: 'NOME_DA_APLICACAO',
        storage,
        whitelist: ['example']
    },
        reducers
    )
    return persistedReducers
}