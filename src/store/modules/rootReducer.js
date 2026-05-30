import { combineReducers } from "redux";
import auth from '../modules/auth/reducer'
import client from '../modules/client/reducer'

export default combineReducers({
    auth,
    client,
})
