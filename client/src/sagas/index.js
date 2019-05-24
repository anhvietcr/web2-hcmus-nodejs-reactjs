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
function* actionSignUp(payload) {
  console.log("post sign up data: ", payload);
  
  // const response = yield call(asyncSignUp, payload);
  const response = {
    status: 200,
    payload: {

    }
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
    status: 200,
    payload: {
      
    }
  }
  yield put(actions.UserUpdateInfoAsync(response))
}


/****************Cinema Cpanel*****************/
// List
function asyncCinemaList() {
  return axios.get(END_POINT + 'cinema')
    .then(response => response)
    .catch((e) => console.log(e));
}
function* actionCinemaList() {
  const response = yield call(asyncCinemaList);

  yield put(actions.CinemaListAsync(response.data))
}

// Add
function asyncCinemaAdd(cinema) {
  return axios.post(END_POINT + 'cinema', { cinema })
    .then(response => response)
    .catch((e) => console.log(e));
}
function* actionCinemaAdd(data) {
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
function* actionCinemaUpdate(data) {
  const {payload} = data
  const response = yield call(asyncCinemaUpdate, payload);
  yield put(actions.CinemaUpdateAsync(response.data))
}

// Delete
function asyncCinemaDelete(payload) {
  const {id} = payload;
  if (!id) return false;

  return axios.delete(END_POINT + 'cinema/' + id)
    .then(response => response)
    .catch((e) => console.log(e));
}
function* actionCinemaDelete(data) {
  const { payload } = data
  const response = yield call(asyncCinemaDelete, payload);

  yield put(actions.CinemaDeleteAsync(response.data))
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
  yield takeLatest(TYPE.CINEMA_LIST, actionCinemaList)
  yield takeLatest(TYPE.CINEMA_ADD, actionCinemaAdd)
  yield takeLatest(TYPE.CINEMA_UPDATE, actionCinemaUpdate)
  yield takeLatest(TYPE.CINEMA_DELETE, actionCinemaDelete)
}
export default CustomSaga