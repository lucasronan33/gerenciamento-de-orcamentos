import { combineReducers } from "redux";
import auth from '../modules/auth/reducer'
import client from '../modules/client/reducer'
import item from '../modules/item/reducer'
import budget from '../modules/budget/reducer'

export default combineReducers({
    auth,
    client,
    item,
    budget,
})
