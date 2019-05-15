import { combineReducers } from 'redux'
import * as TYPE from '../constants/actionTypes'

function QuanLyVe(state = [], action) {
    switch (action.type) {
        case TYPE.DAT_VE_ASYNC: 
            console.log("async data: ", action.data)
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    QuanLyVe
});

export default rootReducer