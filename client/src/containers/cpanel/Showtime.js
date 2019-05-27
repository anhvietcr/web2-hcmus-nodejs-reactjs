import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as TYPE from '../../constants/actionTypes'
import Showtime from '../../components/cpanel/Showtime'

class ShowtimeContainer extends Component {

    render() {
        return (
            <Showtime actions={this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const { TheaterCpanel, ShowtimeCpanel, MovieCpanel } = state;

    return {
        TheaterCpanel,
        ShowtimeCpanel,
        MovieCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
    ListTheaters: () => { dispatch({type: TYPE.THEATER_LIST})},
    ListMovies: () => { dispatch({type: TYPE.MOVIE_LIST})},
    List: () => { dispatch({type: TYPE.SHOWTIME_LIST})},
    Add: (payload) => { dispatch({type: TYPE.SHOWTIME_ADD, payload})},      
    Update: (payload) => { dispatch({type: TYPE.SHOWTIME_UPDATE, payload})},      
    Delete: (payload) => { dispatch({type: TYPE.SHOWTIME_DELETE, payload})},      
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowtimeContainer)