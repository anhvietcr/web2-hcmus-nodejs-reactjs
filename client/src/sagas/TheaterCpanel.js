import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import { END_POINT } from '../constants/actionTypes'

/****************Theater Cpanel*****************/
// List
function asyncTheaterList() {
    return axios.get(END_POINT + 'theater')
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionTheaterList() {
    const response = yield call(asyncTheaterList);

    yield put(actions.TheaterListAsync(response))
}

// Add
function asyncTheaterAdd(theater) {
    return axios.post(END_POINT + 'theater', { theater })
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionTheaterAdd(data) {
    const { payload } = data
    const response = yield call(asyncTheaterAdd, payload);

    yield put(actions.TheaterAddAsync(response))
}

// Update
function asyncTheaterUpdate(theater) {
    return axios.put(END_POINT + 'theater', { theater })
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionTheaterUpdate(data) {
    const { payload } = data;
    const response = yield call(asyncTheaterUpdate, payload);
    
    yield put(actions.TheaterUpdateAsync(response))
}

// Delete
function asyncTheaterDelete(payload) {
    const { id } = payload;
    if (!id) return false;

    return axios.delete(END_POINT + 'theater/' + id)
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionTheaterDelete(data) {
    const { payload } = data
    const response = yield call(asyncTheaterDelete, payload);

    yield put(actions.TheaterDeleteAsync(response))
}