import { combineReducers } from "redux";
import example from '../modules/example/reducer'
import auth from '../modules/auth/reducer'
import client from '../modules/client/reducer'

export default combineReducers({
    example,
    auth,
    client,
})
