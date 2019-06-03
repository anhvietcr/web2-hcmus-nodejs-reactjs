import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import { END } from '@redux-saga/core';

const END_POINT = "http://localhost:5000/"

/****************Showtime Cpanel*****************/
// List
function asyncShowtimeList() {
    return axios.get(END_POINT + 'showtime')
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionShowtimeList() {
    const response = yield call(asyncShowtimeList);

    yield put(actions.ShowtimeListAsync(response.data))
}

// Add
function asyncShowtimeAdd(showtime) {
    return axios.post(END_POINT + 'showtime', { showtime })
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionShowtimeAdd(data) {
    const { payload } = data
    const response = yield call(asyncShowtimeAdd, payload);

    yield put(actions.ShowtimeAddAsync(response.data))
}

// Update
function asyncShowtimeUpdate(showtime) {
    return axios.put(END_POINT + 'showtime', { showtime })
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionShowtimeUpdate(data) {
    const { payload } = data;
    const response = yield call(asyncShowtimeUpdate, payload);

    yield put(actions.ShowtimeUpdateAsync(response.data))
}

// Delete
function asyncShowtimeDelete(payload) {
    const { id } = payload;
    if (!id) return false;

    return axios.delete(END_POINT + 'showtime/' + id)
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionShowtimeDelete(data) {
    const { payload } = data
    const response = yield call(asyncShowtimeDelete, payload);

    yield put(actions.ShowtimeDeleteAsync(response.data))
}

// Show Showtime by Theater
function asyncShowtimeByTheater(payload) {
    const { theater_id } = payload
    if (!theater_id) return false;

    return axios.get(END_POINT + 'theater/showtime?theater_id=' + parseInt(theater_id))
        .then(response => response)
        .catch(e => console.log(e));
}

export function* actionShowtimeByTheater(data) {
    const { payload } = data;
    const response = yield call(asyncShowtimeByTheater, payload);

    yield put(actions.ShowtimeByTheaterAsync(response.data))
}

// Show Showtime by Cinama & Movie
function asyncShowtimeByCinema(payload) {
    const { movie_id, cinema_id } = payload
    if (!cinema_id || !movie_id) return false;

    return axios.get(END_POINT + '/cinema/movie/showtime?cinema_id='+parseInt(cinema_id)+'&movie_id='+parseInt(movie_id))
        .then(response => response)
        .catch(e => console.log(e));
}

export function* actionShowtimeByCinema(data) {
    const { payload } = data;
    const response = yield call(asyncShowtimeByCinema, payload);

    yield put(actions.ShowtimeByCinemaAsync(response.data))
}

// Showtime by movie id
function asyncShowtimeByMovie(payload) {
    const { movie_id } = payload
    if (!movie_id) return false;

    return axios.get(END_POINT + 'movie/cinemas?movie_id=' + movie_id)
        .then(response => response)
        .catch(err =>  console.log(err))
}

export function* actionShowtimeByMovie(data) {
    const { payload } = data
    const response = yield call(asyncShowtimeByMovie, payload)

    yield put(actions.ShowtimeByMovie(response.data))
}