import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as TYPE from '../../constants/actionTypes'
import Movie from '../../components/cpanel/Movie'

class MovieContainer extends Component {

    render() {
        return (
            <Movie actions={this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const { MovieCpanel } = state;

    return {
        MovieCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
    List: () => { dispatch({type: TYPE.MOVIE_LIST})},
    Add: (payload) => { dispatch({type: TYPE.MOVIE_ADD, payload})},      
    Update: (payload) => { dispatch({type: TYPE.MOVIE_UPDATE, payload})},      
    Delete: (payload) => { dispatch({type: TYPE.MOVIE_DELETE, payload})},      
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)