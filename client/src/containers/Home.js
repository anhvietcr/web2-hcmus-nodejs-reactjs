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
    ListTrends: () => {dispatch({type: TYPE.MOVIE_LIST_TREND})},
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)