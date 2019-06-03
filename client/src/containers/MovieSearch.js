import React, {Component} from 'react'
import * as TYPE from '../constants/actionTypes'
import { connect } from 'react-redux'
import MovieSearch from '../components/MovieSearch'

class MovieContainer extends Component {
    render() {
        return (
            <MovieSearch actions={this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    const { MovieCpanel, CinemaCpanel } = state
    return {
        MovieCpanel,
        CinemaCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
    Search: (payload) => {dispatch({type: TYPE.MOVIE_SEARCH_KEYWORD, payload})},
    ListCinema: () => {dispatch({type: TYPE.CINEMA_LIST})}
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)