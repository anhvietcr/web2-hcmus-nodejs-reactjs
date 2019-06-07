import { combineReducers } from 'redux'
import * as TYPE from '../constants/actionTypes'

let initialState = {
    status: 0,
    payload: {
        role: 'guest'
    }
}
function Auth(state = initialState, action) {
    switch(action.type) {
        case TYPE.SIGN_IN_ASYNC:
            return {
                ...state,
                user: action.payload
            }
        case TYPE.SIGN_UP_ASYNC:
            return {
                ...state,
                user: action.payload
            }
        case TYPE.VERIFY_SIGN_UP_ASYNC:
            return {
                ...state,
                user: action.payload
            }
        case TYPE.FORGOT_PASSWORD_ASYNC:
            return {
                ...state,
                password: action.payload
            }
        case TYPE.CHANGE_PASSWORD_ASYNC:
            return {
                ...state,
                password: action.payload
            }
        default:
            return state;
    }
}

function User(state = initialState, action) {
    switch (action.type) {
        case TYPE.USER_UPDATE_INFO_ASYNC:
        return action.payload
    case TYPE.USER_HISTORY_ASYNC:
        return {
            ...state,
            history: action.payload
        }
    default:
        return state;
    }
}

let cinemas = []
function CinemaCpanel(state = initialState, action) {
    switch (action.type) {
        case TYPE.CINEMA_LIST_ASYNC:
            if (action.payload.status === 404) {
                cinemas = []
            } else {
                cinemas = action.payload.payload.cinemas
            }
            return {
                ...state,
                cinemas
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
        case TYPE.ADDRESS_TO_LATLNG_ASYNC:
            return {
                ...state,
                latlng: action.payload
            }
        default:
            return state;
    }
}

let theaters = [];
function TheaterCpanel(state = initialState, action) {
    switch (action.type) {
        case TYPE.THEATER_LIST_ASYNC:
            if (action.payload.status === 404) {
                theaters = []
            } else {
                theaters = action.payload.payload.theaters
            }

            return {
                ...state,
                theaters
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

let movies = []
function MovieCpanel(state = initialState, action) {
    switch (action.type) {
        case TYPE.MOVIE_LIST_ASYNC:
            if (action.payload.status === 404) {
                movies = []
            } else {
                movies = action.payload.payload.movies
            }
            return {
                ...state,
                movies
            }
        case TYPE.MOVIE_ADD_ASYNC:
            return {
                ...state,
                payload: action.payload
            }

        case TYPE.MOVIE_UPDATE_ASYNC:
            return {
                ...state,
                payload: action.payload
            }

        case TYPE.MOVIE_DELETE_ASYNC:
            return {
                ...state,
                payload: action.payload
            }
        case TYPE.MOVIE_LIST_NEW_ASYNC:
            return {
                ...state,
                news: action.payload
            }
        case TYPE.MOVIE_LIST_TREND_ASYNC:
            return {
                ...state,
                trends: action.payload
            }
        case TYPE.MOVIE_SEARCH_KEYWORD_ASYNC:
            return {
                ...state,
                search: action.payload
            }
        default:
            return state;
    }
}

let showtimes = []
function ShowtimeCpanel(state = initialState, action) {
    switch (action.type) {
        case TYPE.SHOWTIME_LIST_ASYNC:
            if (action.payload.status === 404) {
                showtimes = []
            } else {
                showtimes = action.payload.payload.showtimes
            }
            return {
                ...state,
                showtimes
            }
        case TYPE.SHOWTIME_ADD_ASYNC:
            return {
                ...state,
                payload: action.payload
            }
        case TYPE.SHOWTIME_UPDATE_ASYNC:
            return {
                ...state,
                payload: action.payload
            }
        case TYPE.SHOWTIME_DELETE_ASYNC:
            return {
                ...state,
                payload: action.payload
            } 
        case TYPE.SHOWTIME_BY_THEATER_ASYNC: 
            return {
                ...state,
                showtimes_theater: action.payload
            }
        case TYPE.SHOWTIME_BY_CINEMA_ASYNC: 
            return {
                ...state,
                showtimes_cinema: action.payload
            }
        case TYPE.SHOWTIME_BY_MOVIE_ASYNC:
            return {
                ...state,
                showtimes_movie: action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    Auth,
    User,
    CinemaCpanel,
    TheaterCpanel,
    MovieCpanel,
    ShowtimeCpanel
});

export default rootReducer