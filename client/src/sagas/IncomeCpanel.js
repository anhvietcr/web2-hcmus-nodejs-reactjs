import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import { END_POINT } from '../constants/actionTypes'

/****************Income Cpanel*****************/
// Income by Cinema
function asyncGetIncomeByCinema(payload) {
  return axios.post(END_POINT + 'revenue/cinema_revenue', payload)
    .then(response => response.data)
    .catch(err => console.log(err))
}

export function* actionGetIncomeByCinema(data) {
  let response = yield call(asyncGetIncomeByCinema, data);

  yield put(actions.IncomeByCinemaAsync(response))
}

// Income by Movie
function asyncGetIncomeByMovie(payload) {
  return axios.post(END_POINT + 'revenue/movie_revenue', payload)
    .then(response => response.data)
    .catch(err => console.log(err))
}

export function* actionGetIncomeByMovie(data) {
  let response = yield call(asyncGetIncomeByMovie, data);

  yield put(actions.IncomeByMovieAsync(response))
}

  // let response = [
  //     ['1/5/2019', 1], 
  //     ['2/5/2019', 3], 
  //     ['3/5/2019', 5], 
  //     ['4/5/2019', 3], 
  //     ['5/5/2019', 9], 
  //     ['6/5/2019', 31], 
  //     ['7/5/2019', 13], 
  //     ['8/5/2019', 30], 
  //     ['9/5/2019', 31], 
  //     ['10/5/2019', 13], 
  //     ['11/5/2019', 32], 
  //     ['12/5/2019', 6], 
  //     ['13/5/2019', 13], 
  //     ['14/5/2019', 32], 
  //     ['15/5/2019', 51], 
  //     ['16/5/2019', 13], 
  //     ['17/5/2019', 32], 
  //     ['18/5/2019', 31], 
  //     ['19/5/2019', 3], 
  //     ['20/5/2019', 32], 
  //     ['21/5/2019', 31], 
  //     ['22/5/2019', 10], 
  //     ['23/5/2019', 32], 
  //     ['24/5/2019', 6], 
  //     ['25/5/2019', 15], 
  //     ['26/5/2019', 30], 
  // ]
