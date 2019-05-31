import React, {Component} from 'react'
import * as TYPE from '../constants/actionTypes'
import { connect } from 'react-redux'
import Movie from '../components/Movie'

class MovieContainer extends Component {
    render() {
        return (
            <Movie actions={this.props}/>
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