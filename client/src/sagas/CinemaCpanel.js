import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'

const END_POINT = "http://localhost:5000/"

/****************Cinema Cpanel*****************/
// List
function asyncCinemaList() {
    return axios.get(END_POINT + 'cinema')
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionCinemaList() {
    const response = yield call(asyncCinemaList);

    yield put(actions.CinemaListAsync(response.data.payload))
}

// Add
function asyncCinemaAdd(cinema) {
    return axios.post(END_POINT + 'cinema', { cinema })
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionCinemaAdd(data) {
    const { payload } = data
    const response = yield call(asyncCinemaAdd, payload);

    yield put(actions.CinemaAddAsync(response.data))
}

// Update
function asyncCinemaUpdate(cinema) {
    return axios.put(END_POINT + 'cinema', { cinema })
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionCinemaUpdate(data) {
    const { payload } = data
    const response = yield call(asyncCinemaUpdate, payload);
    yield put(actions.CinemaUpdateAsync(response.data))
}

// Delete
function asyncCinemaDelete(payload) {
    const { id } = payload;
    if (!id) return false;

    return axios.delete(END_POINT + 'cinema/' + id)
        .then(response => response)
        .catch((e) => console.log(e));
}
export function* actionCinemaDelete(data) {
    const { payload } = data
    const response = yield call(asyncCinemaDelete, payload);

    yield put(actions.CinemaDeleteAsync(response.data))
}