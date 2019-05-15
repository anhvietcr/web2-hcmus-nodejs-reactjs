import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import * as TYPE from '../constants/actionTypes'

function asyncDatveApi() {

  return axios.get(`http://localhost:5000`)
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
}

export default CustomSaga