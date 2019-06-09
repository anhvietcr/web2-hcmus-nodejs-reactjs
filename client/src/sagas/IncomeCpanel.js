import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'

const END_POINT = "http://localhost:5000/"

/****************Income Cpanel*****************/
// Income by Cinema
function asyncGetIncomeByCinema(payload) {
  return axios.get(END_POINT + 'income/cinema')
    .then(response => response)
    .catch(err => console.log(err))
}

export function* actionGetIncomeByCinema(data) {
  const { payload } = data
  // let response = yield call(asyncGetIncomeByCinema, payload);

  let response = {
    data: [
      ['1/5/2019', 1], 
      ['2/5/2019', 3], 
      ['3/5/2019', 5], 
      ['4/5/2019', 3], 
      ['5/5/2019', 9], 
      ['6/5/2019', 31], 
      ['7/5/2019', 13], 
      ['8/5/2019', 30], 
      ['9/5/2019', 31], 
      ['10/5/2019', 13], 
      ['11/5/2019', 32], 
      ['12/5/2019', 6], 
      ['13/5/2019', 13], 
      ['14/5/2019', 32], 
      ['15/5/2019', 51], 
      ['16/5/2019', 13], 
      ['17/5/2019', 32], 
      ['18/5/2019', 31], 
      ['19/5/2019', 3], 
      ['20/5/2019', 32], 
      ['21/5/2019', 31], 
      ['22/5/2019', 10], 
      ['23/5/2019', 32], 
      ['24/5/2019', 6], 
      ['25/5/2019', 15], 
      ['26/5/2019', 30], 
  ]
  }

  yield put(actions.IncomeByCinema(response.data))
}

// Income by Movie
function asyncGetIncomeByMovie(payload) {
  return axios.get(END_POINT + 'income/movie')
    .then(response => response)
    .catch(err => console.log(err))
}

export function* actionGetIncomeByMovie(data) {
  const { payload } = data
  // let response = yield call(asyncGetIncomeByMovie, data);

  let response = {
    data: [
      ['1/5/2019', 1], 
      ['2/5/2019', 3], 
      ['3/5/2019', 5], 
      ['4/5/2019', 3], 
      ['5/5/2019', 9], 
      ['6/5/2019', 31], 
      ['7/5/2019', 13], 
      ['8/5/2019', 30], 
      ['9/5/2019', 31], 
      ['10/5/2019', 13], 
      ['11/5/2019', 32], 
      ['12/5/2019', 6], 
      ['13/5/2019', 13], 
      ['14/5/2019', 32], 
      ['15/5/2019', 51], 
      ['16/5/2019', 13], 
      ['17/5/2019', 32], 
      ['18/5/2019', 31], 
      ['19/5/2019', 3], 
      ['20/5/2019', 32], 
      ['21/5/2019', 31], 
      ['22/5/2019', 10], 
      ['23/5/2019', 32], 
      ['24/5/2019', 6], 
      ['25/5/2019', 15], 
      ['26/5/2019', 30], 
  ]
  }

  yield put(actions.IncomeByMovie(response.data))
}