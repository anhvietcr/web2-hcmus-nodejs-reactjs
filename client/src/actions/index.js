import * as TYPE from '../constants/actionTypes'

const DatveAsync = (data) => {
    return {
        type: TYPE.DAT_VE_ASYNC,
        data
    }
}

const SignInAsync = (payload) => {
    return {
        type: TYPE.SIGN_IN_ASYNC,
        payload
    }
} 

const SignUpAsync = (payload) => {
    return {
        type: TYPE.SIGN_UP_ASYNC,
        payload
    }
}

const UserUpdateInfoAsync = (payload) => {
    return {
        type: TYPE.USER_UPDATE_INFO_ASYNC,
        payload
    }
}

// Cinema Cpanel
const CinemaListAsync = (payload) => {
    return {
        type: TYPE.CINEMA_LIST_ASYNC,
        payload
    }
}
const CinemaAddAsync = (payload) => {
    return {
        type: TYPE.CINEMA_ADD_ASYNC,
        payload
    }
}
const CinemaUpdateAsync = (payload) => {
    return {
        type: TYPE.CINEMA_UPDATE_ASYNC,
        payload
    }
}
const CinemaDeleteAsync = (payload) => {
    return {
        type: TYPE.CINEMA_DELETE_ASYNC,
        payload
    }
}

// Theater Cpanel
const TheaterListAsync = (payload) => {
    return {
        type: TYPE.THEATER_LIST_ASYNC,
        payload
    }
}
const TheaterAddAsync = (payload) => {
    return {
        type: TYPE.THEATER_ADD_ASYNC,
        payload
    }
}
const TheaterUpdateAsync = (payload) => {
    return {
        type: TYPE.THEATER_UPDATE_ASYNC,
        payload
    }
}
const TheaterDeleteAsync = (payload) => {
    return {
        type: TYPE.MOVIE_DELETE_ASYNC,
        payload
    }
}

// Movie Cpanel
const MovieListAsync = (payload) => {
    return {
        type: TYPE.MOVIE_LIST_ASYNC,
        payload
    }
}
const MovieAddAsync = (payload) => {
    return {
        type: TYPE.MOVIE_ADD_ASYNC,
        payload
    }
}
const MovieUpdateAsync = (payload) => {
    return {
        type: TYPE.MOVIE_UPDATE_ASYNC,
        payload
    }
}
const MovieDeleteAsync = (payload) => {
    return {
        type: TYPE.MOVIE_DELETE_ASYNC,
        payload
    }
}

// Showtime Cpanel
const ShowtimeListAsync = (payload) => {
    return {
        type: TYPE.SHOWTIME_LIST_ASYNC,
        payload
    }
}
const ShowtimeAddAsync = (payload) => {
    return {
        type: TYPE.SHOWTIME_ADD_ASYNC,
        payload
    }
}
const ShowtimeUpdateAsync = (payload) => {
    return {
        type: TYPE.SHOWTIME_UPDATE_ASYNC,
        payload
    }
}
const ShowtimeDeleteAsync = (payload) => {
    return {
        type: TYPE.SHOWTIME_DELETE_ASYNC,
        payload
    }
}

export default {
    DatveAsync,
    SignInAsync,
    SignUpAsync,
    
    UserUpdateInfoAsync,

    CinemaListAsync,
    CinemaAddAsync,
    CinemaUpdateAsync,
    CinemaDeleteAsync,

    TheaterListAsync,
    TheaterAddAsync,
    TheaterUpdateAsync,
    TheaterDeleteAsync,

    MovieListAsync,
    MovieAddAsync,
    MovieUpdateAsync,
    MovieDeleteAsync,

    ShowtimeListAsync,
    ShowtimeAddAsync,
    ShowtimeUpdateAsync,
    ShowtimeDeleteAsync,
}