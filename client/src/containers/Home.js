import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as TYPE from '../constants/actionTypes'
import Home from '../components/Home'

class HomeContainer extends Component {

    render() {
        return (
            <Home actions={this.props} />
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
    ListNews: () => {dispatch({type: TYPE.MOVIE_LIST_NEW})},
    ListViewest: () => {dispatch({type: TYPE.MOVIE_LIST_VIEWEST})},
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)