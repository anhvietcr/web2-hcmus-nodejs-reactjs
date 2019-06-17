import { takeLatest } from 'redux-saga/effects'
import * as TYPE from '../constants/actionTypes'
import * as CinemaCpanel from './CinemaCpanel'
import * as TheaterCpanel from './TheaterCpanel'
import * as MovieCpanel from './MovieCpanel'
import * as ShowtimeCpanel from './ShowtimeCpanel'
import * as IncomeCpanel from './IncomeCpanel'
import * as Auth from './Auth'
import * as User from './User'

function* CustomSaga() {
  yield takeLatest(TYPE.SIGN_IN, Auth.actionSignIn);
  yield takeLatest(TYPE.SIGN_UP, Auth.actionSignUp);
  yield takeLatest(TYPE.VERIFY_SIGN_UP, Auth.actionVerifySignUp)
  yield takeLatest(TYPE.FORGOT_PASSWORD, Auth.actionForgotPassword)
  yield takeLatest(TYPE.CHANGE_PASSWORD, Auth.actionChangePassword)

  yield takeLatest(TYPE.USER_UPDATE_INFO, User.actionUserUpdateInfo);
  yield takeLatest(TYPE.USER_HISTORY, User.actionUserHistory);

  yield takeLatest(TYPE.CINEMA_LIST, CinemaCpanel.actionCinemaList)
  yield takeLatest(TYPE.CINEMA_ADD, CinemaCpanel.actionCinemaAdd)
  yield takeLatest(TYPE.CINEMA_UPDATE, CinemaCpanel.actionCinemaUpdate)
  yield takeLatest(TYPE.CINEMA_DELETE, CinemaCpanel.actionCinemaDelete)
  yield takeLatest(TYPE.ADDRESS_TO_LATLNG, CinemaCpanel.actionAddressToLatLng)


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
  yield takeLatest(TYPE.MOVIE_SEARCH_KEYWORD, MovieCpanel.actionMovieSearchKeyword)
  yield takeLatest(TYPE.MOVIE_UPDATE_VIEW, MovieCpanel.actionMovieUpdateView)

  yield takeLatest(TYPE.SHOWTIME_LIST, ShowtimeCpanel.actionShowtimeList)
  yield takeLatest(TYPE.SHOWTIME_ADD, ShowtimeCpanel.actionShowtimeAdd)
  yield takeLatest(TYPE.SHOWTIME_UPDATE, ShowtimeCpanel.actionShowtimeUpdate)
  yield takeLatest(TYPE.SHOWTIME_DELETE, ShowtimeCpanel.actionShowtimeDelete)
  yield takeLatest(TYPE.SHOWTIME_BY_THEATER, ShowtimeCpanel.actionShowtimeByTheater)
  yield takeLatest(TYPE.SHOWTIME_BY_CINEMA, ShowtimeCpanel.actionShowtimeByCinema)
  yield takeLatest(TYPE.SHOWTIME_BY_MOVIE, ShowtimeCpanel.actionShowtimeByMovie)
  yield takeLatest(TYPE.SHOWTIME_TICKET, ShowtimeCpanel.actionShowtimeTicket)
  yield takeLatest(TYPE.SHOWTIME_CHAIR_BOOKED, ShowtimeCpanel.actionShowtimeChairBooked)

  yield takeLatest(TYPE.INCOME_BY_CINEMA, IncomeCpanel.actionGetIncomeByCinema)
  yield takeLatest(TYPE.INCOME_BY_MOVIE, IncomeCpanel.actionGetIncomeByMovie)
}
export default CustomSaga