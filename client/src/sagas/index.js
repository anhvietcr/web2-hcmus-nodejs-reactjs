import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import actions from '../actions'
import * as TYPE from '../constants/actionTypes'
import * as CinemaCpanel from './CinemaCpanel'
import * as TheaterCpanel from './TheaterCpanel'
import * as MovieCpanel from './MovieCpanel'
import * as ShowtimeCpanel from './ShowtimeCpanel'
import * as Auth from './Auth'
import * as User from './User'

const END_POINT = "http://localhost:5000/";


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
  yield takeLatest(TYPE.SIGN_IN, Auth.actionSignIn);
  yield takeLatest(TYPE.SIGN_UP, Auth.actionSignUp);

  yield takeLatest(TYPE.USER_UPDATE_INFO, User.actionUserUpdateInfo);
  yield takeLatest(TYPE.USER_HISTORY, User.actionUserHistory);

  yield takeLatest(TYPE.CINEMA_LIST, CinemaCpanel.actionCinemaList)
  yield takeLatest(TYPE.CINEMA_ADD, CinemaCpanel.actionCinemaAdd)
  yield takeLatest(TYPE.CINEMA_UPDATE, CinemaCpanel.actionCinemaUpdate)
  yield takeLatest(TYPE.CINEMA_DELETE, CinemaCpanel.actionCinemaDelete)

  yield takeLatest(TYPE.THEATER_LIST, TheaterCpanel.actionTheaterList)
  yield takeLatest(TYPE.THEATER_ADD, TheaterCpanel.actionTheaterAdd)
  yield takeLatest(TYPE.THEATER_UPDATE, TheaterCpanel.actionTheaterUpdate)
  yield takeLatest(TYPE.THEATER_DELETE, TheaterCpanel.actionTheaterDelete)

  yield takeLatest(TYPE.MOVIE_LIST, MovieCpanel.actionMovieList)
  yield takeLatest(TYPE.MOVIE_ADD, MovieCpanel.actionMovieAdd)
  yield takeLatest(TYPE.MOVIE_UPDATE, MovieCpanel.actionMovieUpdate)
  yield takeLatest(TYPE.MOVIE_DELETE, MovieCpanel.actionMovieDelete)
  yield takeLatest(TYPE.MOVIE_LIST_NEW, MovieCpanel.actionMovieListNew)
  yield takeLatest(TYPE.MOVIE_LIST_TREND, MovieCpanel.actionMovieListTrend)

  yield takeLatest(TYPE.SHOWTIME_LIST, ShowtimeCpanel.actionShowtimeList)
  yield takeLatest(TYPE.SHOWTIME_ADD, ShowtimeCpanel.actionShowtimeAdd)
  yield takeLatest(TYPE.SHOWTIME_UPDATE, ShowtimeCpanel.actionShowtimeUpdate)
  yield takeLatest(TYPE.SHOWTIME_DELETE, ShowtimeCpanel.actionShowtimeDelete)
  yield takeLatest(TYPE.SHOWTIME_BY_THEATER, ShowtimeCpanel.actionShowtimeByTheater)
  yield takeLatest(TYPE.SHOWTIME_BY_CINEMA, ShowtimeCpanel.actionShowtimeByCinema)
}
export default CustomSaga