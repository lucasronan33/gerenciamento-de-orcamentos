import { combineReducers } from "redux";
import example from '../modules/example/reducer'
import auth from '../modules/auth/reducer'

export default combineReducers({
    example,
    auth
})
