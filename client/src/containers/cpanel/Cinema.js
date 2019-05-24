import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as TYPE from '../../constants/actionTypes'
import Cinema from '../../components/cpanel/Cinema'

class CinemaContainer extends Component {

    render() {
        return (
            <Cinema actions={this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const { CinemaCpanel } = state;

    return {
        CinemaCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
    List: () => { dispatch({type: TYPE.CINEMA_LIST})},
    Add: (payload) => { dispatch({type: TYPE.CINEMA_ADD, payload})},      
    Update: (payload) => { dispatch({type: TYPE.CINEMA_UPDATE, payload})},      
    Delete: (payload) => { dispatch({type: TYPE.CINEMA_DELETE, payload})},      
});

export default connect(mapStateToProps, mapDispatchToProps)(CinemaContainer)