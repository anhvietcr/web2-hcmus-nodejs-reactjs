import { combineReducers } from 'redux'
import * as TYPE from '../constants/actionTypes'

function QuanLyVe(state = [], action) {
    switch (action.type) {
        case TYPE.DAT_VE_ASYNC: 
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}

let initialStateAuth = {
    status: 500,
    payload: {
        role: 'guest'
    }
}
function Auth(state = initialStateAuth, action) {
    switch(action.type) {
        case TYPE.SIGN_IN_ASYNC:
            return action.payload
        case TYPE.SIGN_UP_ASYNC:
            return action.payload
        default:
            return state;
    }
}

function User(state = initialStateAuth, action) {
    switch (action.type) {
        case TYPE.USER_UPDATE_INFO_ASYNC:
        return action.payload
    default:
        return state;
    }
}

const rootReducer = combineReducers({
    QuanLyVe,
    Auth,
    User
});

export default rootReducer