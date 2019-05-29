import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'

const END_POINT = "http://localhost:5000/"

/****************Movie Cpanel*****************/
// List
function asyncMovieList() {
    return axios.get(END_POINT + 'movie')
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionMovieList() {
    const response = yield call(asyncMovieList);

    yield put(actions.MovieListAsync(response.data.payload))
}

// Add
function asyncMovieAdd(movie) {
    return axios.post(END_POINT + 'movie', { movie })
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionMovieAdd(data) {
    const { payload } = data
    const response = yield call(asyncMovieAdd, payload);

    yield put(actions.MovieAddAsync(response.data))
}

// Update
function asyncMovieUpdate(movie) {
    return axios.put(END_POINT + 'movie', { movie })
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionMovieUpdate(data) {
    const { payload } = data;
    const response = yield call(asyncMovieUpdate, payload);
    
    yield put(actions.MovieUpdateAsync(response.data))
}

// Delete
function asyncMovieDelete(payload) {
    const { id } = payload;
    if (!id) return false;

    return axios.delete(END_POINT + 'movie/' + id)
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionMovieDelete(data) {
    const { payload } = data
    const response = yield call(asyncMovieDelete, payload);

    yield put(actions.MovieDeleteAsync(response.data))
}

// List new
function asyncMovieListNew() {
    return axios.get(END_POINT + 'movie/new')
        .then(response => response)
        .catch(e => console.log(e))
}

export function* actionMovieListNew() {
    const response = yield call(asyncMovieListNew)

    yield put(actions.MovieListNewAsync(response.data))
}

// List Viewest
function asyncMovieListViewest() {
    return axios.get(END_POINT + 'movie/view')
        .then(response => response)
        .catch(e => console.log(e))
}

export function* actionMovieListViewest() {
    const response = yield call(actionMovieListViewest);

    console.log("list movie viewest: ", response);

    yield put(actions.MovieListViewestAsync(response.data))
}