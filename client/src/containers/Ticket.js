import React, { Component } from 'react';
import Ticket from '../components/Ticket'
import * as TYPE from '../constants/actionTypes'
import { connect } from 'react-redux'

class TicketContainer extends Component {

  render() {
    return (
      <Ticket actions={this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    MovieCpanel: state.MovieCpanel,
    ShowtimeCpanel: state.ShowtimeCpanel
  }
}

const mapDispatchToProps = (dispatch) => ({
  MovieUpdateView: (payload) => {dispatch({type: TYPE.MOVIE_UPDATE_VIEW, payload})},
  Ticket: (payload) => {dispatch({type: TYPE.SHOWTIME_TICKET, payload})},
  GetChairsBooked: (payload) => {dispatch({type: TYPE.SHOWTIME_CHAIR_BOOKED, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(TicketContainer)