import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default function persistedReducers(reducers) {
    const persistedReducers = persistReducer({
        key: 'ORCAMENTOS',
        storage,
        whitelist: ['auth']
    },
        reducers
    )
    return persistedReducers
}
