import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import { END_POINT, OPENCAGEDATA_KEY } from '../constants/actionTypes'

/****************Cinema Cpanel*****************/
// List
function asyncCinemaList() {
    return axios.get(END_POINT + 'cinema')
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionCinemaList() {
    const response = yield call(asyncCinemaList);

    yield put(actions.CinemaListAsync(response))
}

// Add
function asyncCinemaAdd(cinema) {
    return axios.post(END_POINT + 'cinema', { cinema })
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionCinemaAdd(data) {
    const { payload } = data
    const response = yield call(asyncCinemaAdd, payload);

    yield put(actions.CinemaAddAsync(response))
}

// Update
function asyncCinemaUpdate(cinema) {
    return axios.put(END_POINT + 'cinema', { cinema })
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionCinemaUpdate(data) {
    const { payload } = data
    const response = yield call(asyncCinemaUpdate, payload);
    
    yield put(actions.CinemaUpdateAsync(response))
}

// Delete
function asyncCinemaDelete(payload) {
    const { id } = payload;
    if (!id) return false;

    return axios.delete(END_POINT + 'cinema/' + id)
        .then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionCinemaDelete(data) {
    const { payload } = data
    const response = yield call(asyncCinemaDelete, payload);

    yield put(actions.CinemaDeleteAsync(response))
}

// Get lat, lng by place name
function asyncAddressToLatLng(address) {
    let endpoint = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${OPENCAGEDATA_KEY}`
    return axios.get(endpoint)
        .then(response => response.data)
        .catch(err => console.log(err))
}

export function* actionAddressToLatLng(data) {
    const { payload } = data
    const response = yield call(asyncAddressToLatLng, payload)

    yield put(actions.AddressToLatLngAsync(response));
}