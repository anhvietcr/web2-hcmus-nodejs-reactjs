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

let initialState = {
    status: 0,
    payload: {
        role: 'guest'
    }
}
function Auth(state = initialState, action) {
    switch(action.type) {
        case TYPE.SIGN_IN_ASYNC:
            return action.payload
        case TYPE.SIGN_UP_ASYNC:
            return action.payload
        default:
            return state;
    }
}

function User(state = initialState, action) {
    switch (action.type) {
        case TYPE.USER_UPDATE_INFO_ASYNC:
        return action.payload
    default:
        return state;
    }
}

function CinemaCpanel(state = initialState, action) {
    switch (action.type) {
        case TYPE.CINEMA_LIST_ASYNC:
            return {
                ...state,
                cinemas: action.payload.cinemas
            }
        case TYPE.CINEMA_ADD_ASYNC:
            return {
                ...state,
                payload: action.payload
            }

        case TYPE.CINEMA_UPDATE_ASYNC:
            return {
                ...state,
                payload: action.payload
            }

        case TYPE.CINEMA_DELETE_ASYNC:
            return {
                ...state,
                payload: action.payload
            } 
        default:
            return state;
    }
}

function TheaterCpanel(state = initialState, action) {
    switch (action.type) {
        case TYPE.THEATER_LIST_ASYNC:
            return {
                ...state,
                theaters: action.payload.theaters
            }
        case TYPE.THEATER_ADD_ASYNC:
            return {
                ...state,
                payload: action.payload
            }

        case TYPE.THEATER_UPDATE_ASYNC:
            return {
                ...state,
                payload: action.payload
            }

        case TYPE.THEATER_DELETE_ASYNC:
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
    Auth,
    User,
    CinemaCpanel,
    TheaterCpanel
});

export default rootReducer