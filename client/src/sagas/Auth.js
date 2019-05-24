import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'

const END_POINT = "http://localhost:5000/"

/****************Auth*****************/
// Sign In
function asyncSignIn(payload) {
    return axios.post(END_POINT + 'auth/login', {
        payload
    }).then(response => response.data)
        .catch((e) => console.log(e));
}
export function* actionSignIn(payload) {
    console.log("post sign in data: ", payload);
    // const response = yield call(asyncSignIn, payload);
    const response = {
        status: 200,
        payload: {
            role: 'admin'
        }
    }
    yield put(actions.SignInAsync(response))
}

// Sign Up
function asyncSignUp(payload) {
    return axios.post(END_POINT + 'auth/register', {
        payload
    }).then(response => response.data)
        .catch((e) => console.log(e));
}
export function* actionSignUp(payload) {
    console.log("post sign up data: ", payload);

    // const response = yield call(asyncSignUp, payload);
    const response = {
        status: 200,
        payload: {

        }
    }
    yield put(actions.SignUpAsync(response))
}
