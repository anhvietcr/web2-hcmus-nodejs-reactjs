import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import * as TYPE from '../constants/actionTypes'

const END_POINT = "http://localhost:5000/";

/****************Auth*****************/
// Sign In
function asyncSignIn(payload) {
  return axios.post(END_POINT + 'auth/login', {
    payload 
  }).then(response => response.data)
    .catch((e) => console.log(e));
}
function* actionSignIn(payload) {
  console.log("post sign in data: ", payload);
  // const response = yield call(asyncSignIn, payload);
  const response = {
    status: 200,
    role: 'admin'
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
function* actionSignUp(payload) {
  console.log("post sign up data: ", payload);
  
  // const response = yield call(asyncSignUp, payload);
  const response = {
    status: 200
  }
  yield put(actions.SignUpAsync(response))
}


/****************User*****************/
// Update information
function asyncUserUpdateInfo(payload) {
  return axios.post(END_POINT + 'user/update', {
    payload 
  }).then(response => response.data)
    .catch((e) => console.log(e));
}
function* actionUserUpdateInfo(payload) {
  console.log("post update information data: ", payload);
  
  // const response = yield call(asyncUserUpdateInfo, payload);
  const response = {
    status: 200
  }
  yield put(actions.UserUpdateInfoAsync(response))
}


/****************Ticker*****************/
function asyncDatveApi() {

  return axios.get(END_POINT)
    .then(response => response.data)
    .catch((e) => console.log(e));
}

function* actionDatve(params) {

  // fetch from api (async)
  const data = yield call(asyncDatveApi);

  // push back to action
  yield put(actions.DatveAsync(data))
}


function* CustomSaga() {
  yield takeLatest(TYPE.DAT_VE, actionDatve);
  yield takeLatest(TYPE.SIGN_IN, actionSignIn);
  yield takeLatest(TYPE.SIGN_UP, actionSignUp);
  yield takeLatest(TYPE.USER_UPDATE_INFO, actionUserUpdateInfo);
}
export default CustomSaga