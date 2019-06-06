import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'

const END_POINT = "http://localhost:5000/"

/****************User*****************/
// Update information
function asyncUserUpdateInfo(payload) {
    return axios.post(END_POINT + 'user/update', {
        payload
    }).then(response => response.data)
        .catch((e) => console.log(e));
}
export function* actionUserUpdateInfo(payload) {
    console.log("post update information data: ", payload);
    const response = yield call(asyncUserUpdateInfo, payload);

    yield put(actions.UserUpdateInfoAsync(response))
}

// List History user by id
function asyncUserHistory(payload) {
    return axios.post(END_POINT + 'user/history', {
        payload
    }).then(response => response)
        .catch(e => console.log(e))
}

export function* actionUserHistory(data) {
    const { payload } = data
    const response = yield call(asyncUserHistory, payload);

    yield put(actions.UserHistoryAsync(response.data))
}