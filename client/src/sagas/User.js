import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import { END_POINT } from '../constants/actionTypes'

/****************User*****************/
// Update information
function asyncUserUpdateInfo(payload) {
    return axios.put(END_POINT + 'user/profile', {
        payload
    }).then(response => response.data)
        .catch(err => console.log(err));
}
export function* actionUserUpdateInfo(data) {
    const { payload } = data
    const response = yield call(asyncUserUpdateInfo, payload);

    yield put(actions.UserUpdateInfoAsync(response))
}

// List History user by id
function asyncUserHistory(payload) {
    return axios.post(END_POINT + 'user/history', {
        payload
    }).then(response => response.data)
        .catch(err => console.log(err))
}

export function* actionUserHistory(data) {
    const { payload } = data
    const response = yield call(asyncUserHistory, payload);

    yield put(actions.UserHistoryAsync(response))
}