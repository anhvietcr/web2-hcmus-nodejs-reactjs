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
    const { ShowtimeCpanel } = state

    return {
        ShowtimeCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
    getShowTimesByMovie: (payload) => {dispatch({type: TYPE.SHOWTIME_BY_MOVIE, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailContainer)