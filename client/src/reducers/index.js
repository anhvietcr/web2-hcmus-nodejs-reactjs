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

let initialStateAuth = {
    payload: {
        status: 500,
        role: 'guest'
    }
}
function Auth(state = initialStateAuth, action) {
    switch(action.type) {
        case TYPE.SIGN_IN_ASYNC:
            return {
                ...state,
                payload: action.payload
            }
        case TYPE.SIGN_UP_ASYNC:
            return {
                ...state,
                payload: action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    QuanLyVe,
    Auth
});

export default rootReducer