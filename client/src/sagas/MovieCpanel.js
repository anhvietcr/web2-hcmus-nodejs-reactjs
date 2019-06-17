import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import { END_POINT } from '../constants/actionTypes'

/****************Movie Cpanel*****************/
// List
function asyncMovieList() {
    return axios.get(END_POINT + 'movie')
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionMovieList() {
    const response = yield call(asyncMovieList);

    yield put(actions.MovieListAsync(response))
}

// Add
function asyncMovieAdd(movie) {
    return axios.post(END_POINT + 'movie', { movie })
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionMovieAdd(data) {
    const { payload } = data
    const response = yield call(asyncMovieAdd, payload);

    yield put(actions.MovieAddAsync(response))
}

// Update
function asyncMovieUpdate(movie) {
    return axios.put(END_POINT + 'movie', { movie })
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionMovieUpdate(data) {
    const { payload } = data;
    const response = yield call(asyncMovieUpdate, payload);
    
    yield put(actions.MovieUpdateAsync(response))
}

// Delete
function asyncMovieDelete(payload) {
    const { id } = payload;
    if (!id) return false;

    return axios.delete(END_POINT + 'movie/' + id)
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionMovieDelete(data) {
    const { payload } = data
    const response = yield call(asyncMovieDelete, payload);

    yield put(actions.MovieDeleteAsync(response))
}

// List new
function asyncMovieListNew() {
    return axios.get(END_POINT + 'movie/new')
        .then(response => response.data)
        .catch(err => console.log(err))
}

export function* actionMovieListNew() {
    const response = yield call(asyncMovieListNew)

    yield put(actions.MovieListNewAsync(response))
}

// List Viewest
function asyncMovieListTrend() {
    return axios.get(END_POINT + 'movie/trending')
        .then(response => response.data)
        .catch(err => console.log(err))
}

export function* actionMovieListTrend() {
    const response = yield call(asyncMovieListTrend);

    yield put(actions.MovieListTrendAsync(response))
}

// Search phim by keyword
function asyncMovieSearchKeyword(keyword) {
    return axios.get(END_POINT + 'movie/search/' + keyword)
        .then(response => response.data)
        .catch(err => console.log(err))
}

export function* actionMovieSearchKeyword(data) {
    const { payload } = data;
    const reponse = yield call(asyncMovieSearchKeyword, payload);

    yield put(actions.MovieSearchKeyword(reponse));
}

// Update view movie by id
function asyncMovieUpdateView(id) {
    return axios.put(END_POINT + 'movie/view?id=' + id)
        .then(response => response.data)
        .catch(err => console.log(err))
}

export function* actionMovieUpdateView(data) {
    const { payload } = data;
    const reponse = yield call(asyncMovieUpdateView, payload);

    yield put(actions.MovieUpdateView(reponse));
}