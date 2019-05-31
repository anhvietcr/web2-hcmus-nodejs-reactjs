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

// User Cpanel
const UserUpdateInfoAsync = (payload) => {
    return {
        type: TYPE.USER_UPDATE_INFO_ASYNC,
        payload
    }
}

const UserHistoryAsync = (payload) => {
    return {
        type: TYPE.USER_HISTORY_ASYNC,
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

const MovieListNewAsync = (payload) => {
    return {
        type: TYPE.MOVIE_LIST_NEW_ASYNC,
        payload
    }
}

const MovieListTrendAsync = (payload) => {
    return {
        type: TYPE.MOVIE_LIST_TREND_ASYNC,
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
const ShowtimeByTheaterAsync = (payload) => {
    return {
        type: TYPE.SHOWTIME_BY_THEATER_ASYNC,
        payload
    }
}
const ShowtimeByCinemaAsync = (payload) => {
    return {
        type: TYPE.SHOWTIME_BY_CINEMA_ASYNC,
        payload
    }
}

export default {
    DatveAsync,
    SignInAsync,
    SignUpAsync,
    
    UserUpdateInfoAsync,
    UserHistoryAsync,

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
    MovieListNewAsync,
    MovieListTrendAsync,

    ShowtimeListAsync,
    ShowtimeAddAsync,
    ShowtimeUpdateAsync,
    ShowtimeDeleteAsync,
    ShowtimeByTheaterAsync,
    ShowtimeByCinemaAsync,
}