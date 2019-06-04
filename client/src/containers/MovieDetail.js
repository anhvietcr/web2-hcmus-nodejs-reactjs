import React, { Component } from 'react'
import MovieDetail from '../components/MovieDetail'
import { connect } from 'react-redux'
import * as TYPE from '../constants/actionTypes'

class MovieDetailContainer extends Component {
    
    render() {
        return(
            <MovieDetail actions={this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const { ShowtimeCpanel, CinemaCpanel } = state

    return {
        ShowtimeCpanel,
        CinemaCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
    getShowTimesByMovie: (payload) => {dispatch({type: TYPE.SHOWTIME_BY_MOVIE, payload})},
    getLatLng: (payload) => {dispatch({type: TYPE.ADDRESS_TO_LATLNG, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailContainer)