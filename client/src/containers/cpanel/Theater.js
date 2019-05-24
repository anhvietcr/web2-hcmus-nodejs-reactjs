import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as TYPE from '../../constants/actionTypes'
import Theater from '../../components/cpanel/Theater'

class TheaterContainer extends Component {

    render() {
        return (
            <Theater actions={this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const { TheaterCpanel } = state;

    return {
        TheaterCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
    List: () => { dispatch({type: TYPE.THEATER_LIST})},
    Add: (payload) => { dispatch({type: TYPE.THEATER_ADD, payload})},      
    Update: (payload) => { dispatch({type: TYPE.THEATER_UPDATE, payload})},      
    Delete: (payload) => { dispatch({type: TYPE.THEATER_DELETE, payload})},      
});

export default connect(mapStateToProps, mapDispatchToProps)(TheaterContainer)