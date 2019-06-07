import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'

const END_POINT = "http://localhost:5000/"

/****************Auth*****************/
// Sign In
function asyncSignIn(payload) {
    return axios.post(END_POINT + 'user/login', {
        payload
    }).then(response => response)
        .catch((e) => console.log(e));
}
export function* actionSignIn(data) {
    const { payload } = data
    const response = yield call(asyncSignIn, payload);

    yield put(actions.SignInAsync(response.data))
}

// Sign Up
function asyncSignUp(payload) {
    return axios.post(END_POINT + 'user/register', {
        payload
    }).then(response => response)
        .catch((e) => console.log(e));
}
export function* actionSignUp(data) {
    const { payload } = data
    const response = yield call(asyncSignUp, payload);

    yield put(actions.SignUpAsync(response.data))
}

// Verify Sign Up
function asyncVerifySignUp(payload) {
    return axios.get(END_POINT + 'user/register?code=' + payload)
        .then(response => response)
        .catch(err => console.log(err))
}

export function* actionVerifySignUp(data) {
    const { payload } = data;
    const response = yield call(asyncVerifySignUp, payload)

    yield put(actions.VerifySignUpAsync(response.data))
}

// Forgot password
function asyncForgotPassword(payload) {
    return axios.post(END_POINT + 'user/forget-password', {payload})
        .then(response => response)
        .catch(err => console.log(err))
}

export function* actionForgotPassword(data) {
    const {payload} = data;
    const response = yield call(asyncForgotPassword, payload)

    console.log(response.data)

    yield put(actions.ForgotPasswordAsync(response.data))
}