import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as TYPE from '../../constants/actionTypes'
import Income from '../../components/cpanel/Income'

class IncomeContainer extends Component {

    render() {
        return (
            <Income actions={this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const { IncomeCpanel, CinemaCpanel, MovieCpanel } = state;

    return {
      IncomeCpanel,
      CinemaCpanel, 
      MovieCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
  GetIncomeByCinema: (payload) => {dispatch({type: TYPE.INCOME_BY_CINEMA, payload})},
  GetIncomeByMovie: (payload) => {dispatch({type: TYPE.INCOME_BY_MOVIE, payload})},
  ListCinemas: () => {dispatch({type: TYPE.CINEMA_LIST})},
  ListMovies: () => {dispatch({type: TYPE.MOVIE_LIST})}
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomeContainer)