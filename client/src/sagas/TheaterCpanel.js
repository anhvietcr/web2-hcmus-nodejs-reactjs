import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'

const END_POINT = "http://localhost:5000/"

/****************Theater Cpanel*****************/
// List
function asyncTheaterList() {
    return axios.get(END_POINT + 'theater')
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionTheaterList() {
    const response = yield call(asyncTheaterList);

    yield put(actions.TheaterListAsync(response.data))
}

// Add
function asyncTheaterAdd(theater) {
    return axios.post(END_POINT + 'theater', { theater })
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionTheaterAdd(data) {
    const { payload } = data
    const response = yield call(asyncTheaterAdd, payload);

    yield put(actions.TheaterAddAsync(response.data))
}

// Update
function asyncTheaterUpdate(theater) {
    return axios.put(END_POINT + 'theater', { theater })
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionTheaterUpdate(data) {
    const { payload } = data
    const response = yield call(asyncTheaterUpdate, payload);
    yield put(actions.TheaterUpdateAsync(response.data))
}

// Delete
function asyncTheaterDelete(payload) {
    const { id } = payload;
    if (!id) return false;

    return axios.delete(END_POINT + 'theater/' + id)
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionTheaterDelete(data) {
    const { payload } = data
    const response = yield call(asyncTheaterDelete, payload);

    yield put(actions.TheaterDeleteAsync(response.data))
}