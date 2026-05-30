import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default function persistedReducers(reducers) {
    const persistedReducers = persistReducer({
        key: 'ATEND.IA',
        storage,
        whitelist: ['auth']
    },
        reducers
    )
    return persistedReducers
}
