import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import { END_POINT } from '../constants/actionTypes'

/****************Showtime Cpanel*****************/
// List
function asyncShowtimeList() {
    return axios.get(END_POINT + 'showtime')
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionShowtimeList() {
    const response = yield call(asyncShowtimeList);

    yield put(actions.ShowtimeListAsync(response))
}

// Add
function asyncShowtimeAdd(showtime) {
    return axios.post(END_POINT + 'showtime', { showtime })
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionShowtimeAdd(data) {
    const { payload } = data
    const response = yield call(asyncShowtimeAdd, payload);

    yield put(actions.ShowtimeAddAsync(response))
}

// Update
function asyncShowtimeUpdate(showtime) {
    return axios.put(END_POINT + 'showtime', { showtime })
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionShowtimeUpdate(data) {
    const { payload } = data;
    const response = yield call(asyncShowtimeUpdate, payload);

    yield put(actions.ShowtimeUpdateAsync(response))
}

// Delete
function asyncShowtimeDelete(payload) {
    const { id } = payload;
    if (!id) return false;

    return axios.delete(END_POINT + 'showtime/' + id)
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionShowtimeDelete(data) {
    const { payload } = data
    const response = yield call(asyncShowtimeDelete, payload);

    yield put(actions.ShowtimeDeleteAsync(response))
}

// Show Showtime by Theater
function asyncShowtimeByTheater(payload) {
    const { theater_id } = payload
    if (!theater_id) return false;

    return axios.get(END_POINT + 'theater/showtime?theater_id=' + parseInt(theater_id))
        .then(response => response.data)
        .catch(err => console.log(err));
}

export function* actionShowtimeByTheater(data) {
    const { payload } = data;
    const response = yield call(asyncShowtimeByTheater, payload);

    yield put(actions.ShowtimeByTheaterAsync(response))
}

// Show Showtime by Cinama & Movie
function asyncShowtimeByCinema(payload) {
    const { movie_id, cinema_id } = payload
    if (!cinema_id || !movie_id) return false;

    return axios.get(END_POINT + '/cinema/movie/showtime?cinema_id='+parseInt(cinema_id)+'&movie_id='+parseInt(movie_id))
        .then(response => response.data)
        .catch(err => console.log(err));
}

export function* actionShowtimeByCinema(data) {
    const { payload } = data;
    const response = yield call(asyncShowtimeByCinema, payload);

    yield put(actions.ShowtimeByCinemaAsync(response))
}

// Showtime by movie id
function asyncShowtimeByMovie(payload) {
    const { movie_id } = payload
    if (!movie_id) return false;

    return axios.get(END_POINT + 'movie/cinemas?movie_id=' + movie_id)
        .then(response => response.data)
        .catch(err =>  console.log(err))
}

export function* actionShowtimeByMovie(data) {
    const { payload } = data
    const response = yield call(asyncShowtimeByMovie, payload)

    yield put(actions.ShowtimeByMovieAsync(response))
}

// Showtime ticket (booking)
function asyncShowtimeTicket(payload) {
    return axios.post(END_POINT + 'booking', {payload})
        .then(response => response.data)
        .catch(err => console.log(err))
}

export function* actionShowtimeTicket(data) {
    const { payload } = data
    const response = yield call(asyncShowtimeTicket, payload)

    console.log(response)

    yield put(actions.ShowtimeTicketAsync(response))
}

// Showtime get chairs was booked
function asyncShowtimeChairBooked(payload) {
    return axios.post(END_POINT + '/showtime/booked', payload)
        .then(response => response.data)
        .catch(err => console.log(err))
}

export function* actionShowtimeChairBooked(data) {
    const { payload } = data
    // const response = yield call(asyncShowtimeChairBooked, payload)
    // console.log(response)

    const response = [
        [0, 0],
        [2, 1],
        [1, 3]
    ];
      
    yield put(actions.ShowtimeChairBookedAsync(response))
}